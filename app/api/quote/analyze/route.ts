import { NextResponse } from 'next/server';

/**
 * POST /api/quote/analyze
 *
 * Receives one compressed image of the customer's knives, runs a cheap vision
 * model over it, and returns a structured count + damage assessment that
 * PRE-FILLS the quote calculator. The customer always confirms/edits the
 * numbers before the estimate is sent — the AI never issues a quote itself.
 *
 * Body: multipart form-data with a single `image` file (client already
 * compresses to <=1600px / ~200-400KB via lib/client-compress.ts).
 * Env: OPENAI_API_KEY (server-side only — never exposed to the browser).
 *      Optional QUOTE_VISION_MODEL override (default gpt-4o-mini).
 *
 * Stateless by design: the image is analysed and discarded, never stored.
 */

const MODEL = process.env.QUOTE_VISION_MODEL ?? 'gpt-4o-mini';
const API_BASE = process.env.OPENAI_API_BASE ?? 'https://api.openai.com';
const MAX_BYTES = 2_000_000; // belt-and-suspenders on top of client compression
const TIMEOUT_MS = 30_000;

// Vision calls routinely take 10-20s; the platform default can be shorter.
export const maxDuration = 45;

type AnalysisResult = {
  standard: number; // chef / utility / paring / cleaver / boning / double-bevel knives
  serrated: number; // bread knives, any scalloped edge
  scissors: number; // pairs of scissors (a pair counts as 1)
  repairs: number; // blades needing repair: large chips, broken/rolled tips, rust (de-rusting), bent blades (straightening)
  ceramic: boolean; // any blade that does NOT look like steel (ceramic, colored, matte, coated, non-metallic)
  note: string; // short human summary, e.g. "Found 4 blades, 1 needs a repair"
};

const SYSTEM_PROMPT = [
  'You are the intake assistant for Knife Sharpening Singapore, a knife sharpening service.',
  'Look at the photo of knives and reply with JSON only — no markdown, no prose.',
  '',
  'Count every knife and pair of scissors in the photo. Ignore everything else:',
  'cutting boards, spoons, forks, hands, food, packaging, pets, backgrounds.',
  '',
  'Classify each item:',
  '- standard: chef\'s knives, utility, paring, boning, cleavers, and any double-bevel kitchen knife',
  '- serrated: bread knives and any knife with a scalloped / serrated edge',
  '- scissors: pairs of scissors (count one pair as 1)',
  '- when you cannot confidently classify an item, count it as standard',
  '',
  'Count repairs:',
  '- repairs: how many blades need repair work. Repairs include LARGE chips or nicks,',
  '  broken or rolled tips, visible rust or heavy corrosion (de-rusting), and bent or',
  '  warped blades (straightening). Tiny hairline chips that barely affect the edge do',
  '  NOT count as repairs. If unsure whether damage is significant, count it — the',
  '  customer confirms the final number at booking.',
  '',
  'Flag non-steel blades:',
  '- ceramic: true if ANY blade does not look like steel — e.g. white or ivory ceramic,',
  '  or any colored (pink, red, blue, green, orange), matte, stone-like, coated, or',
  '  otherwise non-metallic-looking blade. Steel blades are grey/silver, metallic, shiny',
  '  and reflective — do NOT flag those.',
  '',
  'Be conservative. When uncertain whether an object is a knife, do NOT count it.',
  'Return exactly: {"standard": number, "serrated": number, "scissors": number, "repairs": number, "ceramic": boolean, "note": string}',
].join('\n');

function clampInt(v: unknown, fallback = 0): number {
  const n = Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(0, Math.min(99, Math.round(n)));
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('quote/analyze: OPENAI_API_KEY not configured');
    return NextResponse.json(
      { error: 'Vision analysis is not configured on the server yet.' },
      { status: 503 },
    );
  }

  let imageBase64: string;
  let fileType: string;
  try {
    const form = await request.formData();
    const file = form.get('image');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Missing image file.' }, { status: 400 });
    }
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'The uploaded file is not an image.' }, { status: 400 });
    }
    const bytes = Buffer.from(await file.arrayBuffer());
    if (bytes.byteLength === 0) {
      return NextResponse.json({ error: 'The uploaded image is empty.' }, { status: 400 });
    }
    if (bytes.byteLength > MAX_BYTES) {
      return NextResponse.json(
        { error: 'Image too large — please upload a photo under 2 MB.' },
        { status: 400 },
      );
    }
    imageBase64 = bytes.toString('base64');
    fileType = file.type;
  } catch (err) {
    console.error('quote/analyze: could not read upload', err);
    return NextResponse.json({ error: 'Could not read the uploaded image.' }, { status: 400 });
  }

  let openAiRes: Response;
  try {
    openAiRes = await fetch(`${API_BASE}/v1/chat/completions`, {
      method: 'POST',
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 500,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Analyse this photo of knives.' },
              {
                type: 'image_url',
                image_url: { url: `data:${fileType};base64,${imageBase64}`, detail: 'low' },
              },
            ],
          },
        ],
      }),
    });
  } catch (err) {
    // Network failure or the 30s timeout — never let this bubble up as a 500,
    // the client parses our JSON error body to show a useful message.
    console.error('quote/analyze: request to OpenAI failed', err);
    return NextResponse.json(
      { error: 'Vision analysis timed out — please try again or enter your knives manually.' },
      { status: 504 },
    );
  }

  if (!openAiRes.ok) {
    const body = await openAiRes.text();
    console.error('quote/analyze: OpenAI error', openAiRes.status, body.slice(0, 500));
    return NextResponse.json(
      { error: 'Vision analysis failed — please try again or enter your knives manually.' },
      { status: 502 },
    );
  }

  let parsed: Record<string, unknown>;
  try {
    const data = await openAiRes.json();
    const content: string | undefined = data?.choices?.[0]?.message?.content;
    if (!content) {
      console.error('quote/analyze: empty model response', JSON.stringify(data).slice(0, 500));
      return NextResponse.json(
        { error: 'Vision analysis came back empty — please try again.' },
        { status: 502 },
      );
    }
    try {
      parsed = JSON.parse(content);
    } catch {
      // Model occasionally wraps the JSON in ``` fences — strip them defensively.
      const fenced = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      parsed = JSON.parse(fenced ? fenced[1] : content);
    }
  } catch (err) {
    console.error('quote/analyze: could not parse model response', err);
    return NextResponse.json(
      { error: 'Vision analysis came back malformed — please try again.' },
      { status: 502 },
    );
  }

  const result: AnalysisResult = {
    standard: clampInt(parsed.standard),
    serrated: clampInt(parsed.serrated),
    scissors: clampInt(parsed.scissors),
    repairs: clampInt(parsed.repairs),
    ceramic: parsed.ceramic === true,
    note: typeof parsed.note === 'string' ? parsed.note.slice(0, 300) : '',
  };

  return NextResponse.json(result);
}
