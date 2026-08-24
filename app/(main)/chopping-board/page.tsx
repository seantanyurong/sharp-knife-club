import type { Metadata } from 'next';
import WhatsAppLink from '@/components/ui/whatsapp';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { googleReviews } from '@/constants/google_reviews';
import { WAITLIST_MSG } from '@/constants/chopping_board';

export const metadata: Metadata = {
  title:
    'End-Grain Chopping Boards Singapore | Rescued Local Wood | Knife Sharpening SG',
  description:
    'Handcrafted end-grain chopping boards made from rescued Singapore hardwood, built by a local woodworker. The board that keeps your freshly sharpened knives sharp. Delivered free with your next knife pickup.',
};

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-stone-950 text-stone-50">
      {/* subtle wood-grain vibe */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'repeating-linear-gradient(100deg, transparent 0 3px, rgba(255,255,255,0.015) 3px 4px, transparent 4px 60px), repeating-linear-gradient(10deg, transparent 0 2px, rgba(255,255,255,0.02) 2px 3px, transparent 3px 45px)',
        }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-400">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            Waitlist · Limited first batch
          </p>
          <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            The board that keeps your edge{' '}
            <span className="text-amber-400">sharp.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-300">
            We spend an hour restoring your knife to razor sharp — then most
            people chop on a cheap board and ruin it in a week. This board is
            different: handcrafted from rescued Singapore wood, cut end-grain,
            and built by a local woodworker to respect the edge you just paid
            for.
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <WhatsAppLink
              origin="chopping-board-hero"
              message={WAITLIST_MSG}
              className="block w-full sm:w-auto"
            >
              <span className="block w-full rounded-full bg-amber-400 px-6 py-4 text-center text-base font-black text-stone-950 transition hover:bg-amber-300 sm:px-8 sm:text-lg">
                Join the waitlist on WhatsApp&nbsp;→
              </span>
            </WhatsAppLink>
            <span className="text-sm text-stone-400">
              Waitlisters get{' '}
              <span className="font-bold text-amber-400">S$20 off</span> ·
              delivered with your knives
            </span>
          </div>
        </div>
        <div className="relative aspect-square w-full max-w-md justify-self-center overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10 lg:max-w-none">
          <Image
            src="/images/chopping-board/board.webp"
            alt="End-grain chopping board handcrafted from rescued Singapore wood"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Why end grain + local wood                                          */
/* ------------------------------------------------------------------ */
const WHY = [
  {
    title: 'Knife-friendly by design',
    body: 'End-grain boards are cutting surfaces where the wood fibres face up, so the blade slides between fibres instead of smashing across them. Your edge stays sharp 2–3× longer than on plastic, glass, or bamboo.',
  },
  {
    title: 'Self-healing surface',
    body: 'End-grain fibres part and close back up around cuts, so the board hides knife marks instead of accumulating them. It looks new for years, not months.',
  },
  {
    title: 'Rescued Singapore wood',
    body: 'Every board starts as a tree that once stood in Singapore — felled for urban development, kiln-dried, and conditioned for our humidity. Local wood, acclimated to our weather, so it never warps or cracks.',
  },
];

function WhyEndGrain() {
  return (
    <section className="bg-stone-50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lg lg:col-span-2 lg:aspect-auto lg:h-full">
            <Image
              src="/images/chopping-board/tree.webp"
              alt="A rescued Singapore tree — the wood inside every board"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-3">
            <p className="text-xs font-black uppercase tracking-widest text-amber-600">
              Why end grain
            </p>
            <h2 className="mt-2 max-w-2xl text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">
              The sharpening doesn&apos;t end when your knives come home.
            </h2>
            <div className="mt-8 space-y-5">
              {WHY.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:shadow-md sm:p-7"
                >
                  <div className="mb-3 h-1 w-10 rounded-full bg-amber-400" />
                  <h3 className="text-xl font-black text-stone-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-stone-600">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Workshop strip (images only)                                        */
/* ------------------------------------------------------------------ */
const PROCESS_IMAGES = [
  {
    src: '/images/chopping-board/process-1.webp',
    alt: 'Selecting a hardwood slab in the workshop',
  },
  {
    src: '/images/chopping-board/process-2.webp',
    alt: 'Machining the wood to size',
  },
  {
    src: '/images/chopping-board/process-3.webp',
    alt: 'Sanding the board smooth before oiling',
  },
];

function WorkshopStrip() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
          {PROCESS_IMAGES.map((img) => (
            <div
              key={img.src}
              className="group relative aspect-[3/2] overflow-hidden rounded-3xl bg-stone-100 shadow-lg"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* How it's made (story)                                               */
/* ------------------------------------------------------------------ */
const PROCESS = [
  {
    n: '01',
    title: 'A Singapore tree comes down',
    body: 'Storm-felled and roadside trees that would otherwise be chipped or burnt. We take the trunk before it goes to waste.',
    image: '/images/chopping-board/tree-2.webp',
  },
  {
    n: '02',
    title: 'Milled, dried, glued end-grain',
    body: 'The trunk is slabbed and dried for months, then cut and glued so the fibres stand upright -- the structure that lets an edge sink in instead of skating across.',
    image: '/images/chopping-board/step-2.webp',
  },
  {
    n: '03',
    title: 'Flattened, sanded, oiled',
    body: 'Planed dead flat, sanded through the grits, then finished with food-safe oil until the grain comes alive.',
    image: '/images/chopping-board/hero.webp',
  },
];

function HowItsMade() {
  return (
    <section className="bg-stone-50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-black uppercase tracking-widest text-amber-600">
            How it&apos;s made
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">
            From a felled tree to your counter.
          </h2>
          <p className="mt-4 text-stone-500">
            Every board starts as a Singapore tree that was already coming down.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {PROCESS.map((step) => (
            <div key={step.n} className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-stone-100 shadow-lg">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-stone-950/80 px-3 py-1 text-xs font-black tracking-widest text-amber-400 backdrop-blur">
                  {step.n}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-black text-stone-900">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-stone-600">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Customer proof (from the knife sharpening service)                  */
/* ------------------------------------------------------------------ */
const GOOGLE_REVIEWS_URL = 'https://g.co/kgs/aXcTBcs';

// Picked for what they say about finish, care and communication -- the
// qualities that carry over from sharpening to woodwork. Selected by id so the
// review text stays single-sourced in constants/google_reviews.
const PROOF_REVIEWS = ['Eugene-Chang', 'Doreen-Leong', 'Paul-Martin']
  .map((src) => googleReviews.find((r) => r.src === src))
  .filter((r): r is (typeof googleReviews)[number] => Boolean(r));

function Proof() {
  return (
    <section className="bg-stone-950 py-16 text-stone-50 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-black uppercase tracking-widest text-amber-400">
            The same hands
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            You already trust us with your knives.
          </h2>
          <p className="mt-4 leading-relaxed text-stone-300">
            These are reviews of our knife sharpening service. The boards are
            built to the same standard — by people who spend all day caring
            about an edge and a finish.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="text-lg font-black text-amber-400">5.0</span>
            <span className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-amber-400 text-amber-400"
                />
              ))}
            </span>
            <span className="text-sm text-stone-400">163 Google reviews</span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PROOF_REVIEWS.map((review) => (
            <figure
              key={review.src}
              className="flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5"
            >
              <div className="relative aspect-[4/3] w-full border-b border-white/10">
                <Image
                  src={`/google-reviews/thumbnail/${review.src}.webp`}
                  alt={`Knives we sharpened for ${review.user}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 leading-relaxed text-stone-200">
                  “{review.comment}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={`/google-reviews/profile/${review.src}.png`}
                      alt=""
                    />
                    <AvatarFallback className="bg-white/10 text-xs font-bold text-stone-50">
                      {review.user.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-bold">{review.user}</p>
                    <p className="text-xs text-stone-400">{review.handle}</p>
                  </div>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-bold text-amber-400 underline underline-offset-4 hover:text-amber-300"
          >
            Read all 163 reviews on Google →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* The board (single size)                                             */
/* ------------------------------------------------------------------ */
const BOARD = {
  name: 'The End-Grain Board',
  size: '40 × 30 cm · 5 cm thick',
  price: 'S$79',
  was: 'S$99',
  features: [
    'End-grain construction',
    'Rescued Singapore hardwood',
    'Food-safe oil finish',
    'Juice groove',
    'Non-slip feet',
  ],
};

function BoardSelection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-black uppercase tracking-widest text-amber-600">
            The board
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">
            One board. No compromises.
          </h2>
          <p className="mt-4 text-stone-500">
            Handcrafted by a local Singapore woodworker · first batch limited to
            10 boards
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <div className="relative flex flex-col overflow-hidden rounded-3xl border border-amber-400 bg-stone-950 text-stone-50 shadow-xl">
            <span className="absolute right-4 top-4 z-10 rounded-full bg-amber-400 px-3 py-1 text-xs font-black uppercase tracking-wide text-stone-950">
              First batch
            </span>
            <div className="relative m-4 aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/chopping-board/board.webp"
                alt={`${BOARD.name} — end-grain local hardwood`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col p-6 pt-2">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black">{BOARD.name}</h3>
                  <p className="mt-1 text-sm opacity-70">{BOARD.size}</p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-sm line-through opacity-50">
                    {BOARD.was}
                  </span>
                  <div className="text-3xl font-black">{BOARD.price}</div>
                </div>
              </div>
              <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                {BOARD.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-amber-400">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col items-stretch gap-4 border-t border-white/10 pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                <p className="text-sm text-stone-400">
                  Waitlisters get{' '}
                  <span className="font-bold text-amber-400">S$20 off</span> —
                  then the price goes back up.
                </p>
                <WhatsAppLink
                  origin="chopping-board-main"
                  message={WAITLIST_MSG}
                  className="block w-full sm:w-auto"
                >
                  <span className="block w-full rounded-full bg-amber-400 px-7 py-3.5 text-center font-black text-stone-950 transition hover:bg-amber-300">
                    Join waitlist
                  </span>
                </WhatsAppLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* How it works                                                        */
/* ------------------------------------------------------------------ */
const STEPS = [
  {
    n: '01',
    title: 'Message us on WhatsApp',
    body: 'Tell us your delivery area and we confirm your batch slot and delivery window.',
  },
  {
    n: '02',
    title: 'We deliver it with your knives',
    body: 'No extra delivery fee — the board rides along on your next pickup or return trip, islandwide.',
  },
  {
    n: '03',
    title: 'Free conditioning, every sharpening',
    body: 'Bring your knives back and we re-oil and condition your board free, every single time.',
  },
];

function HowItWorks() {
  return (
    <section className="bg-stone-950 py-16 text-stone-50 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs font-black uppercase tracking-widest text-amber-400">
          How it works
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
          Zero delivery cost. Zero maintenance hassle.
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.n} className="border-t-2 border-amber-400/60 pt-6">
              <span className="text-5xl font-black text-amber-400/30">
                {step.n}
              </span>
              <h3 className="mt-4 text-xl font-black">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-stone-400">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */
const FAQS = [
  {
    q: 'What wood is it made from?',
    a: 'Rescued Singapore hardwood — urban trees felled for development, kiln-dried and conditioned for our humidity. Every board is a piece of Singapore, given a second life in your kitchen.',
  },
  {
    q: 'Who makes the boards?',
    a: 'A local Singapore woodworker, handcrafting each board in small batches. No factories, no imports — just local wood and local hands.',
  },
  {
    q: 'Do I have to buy it with a sharpening order?',
    a: 'No — but if you have knives coming our way anyway, we deliver the board on the same trip and you pay nothing extra for delivery.',
  },
  {
    q: 'What if it cracks or warps?',
    a: 'Every board is kiln-dried and conditioned for Singapore humidity, and we re-oil it free with every sharpening. If it cracks within 12 months, we repair or replace it.',
  },
];

function Faq() {
  return (
    <section className="bg-stone-50 py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-xs font-black uppercase tracking-widest text-amber-600">
          FAQ
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">
          Questions, answered.
        </h2>
        <div className="mt-10 divide-y divide-stone-200 border-y border-stone-200">
          {FAQS.map((faq) => (
            <details key={faq.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-stone-900">
                {faq.q}
                <span className="shrink-0 text-amber-600 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-stone-600">{faq.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-stone-900 p-5 text-center text-stone-50 sm:p-8">
          <h3 className="text-xl font-black sm:text-2xl">
            Waitlisters get S$20 off.
          </h3>
          <p className="mx-auto mt-2 max-w-md text-stone-300">
            The price goes back up once the first batch is gone. Join the
            waitlist now and it arrives with your next knife delivery.
          </p>
          <div className="mt-6">
            <WhatsAppLink
              origin="chopping-board-faq"
              message={WAITLIST_MSG}
              className="block"
            >
              <span className="block w-full rounded-full bg-amber-400 px-5 py-4 text-center text-base font-black text-stone-950 transition hover:bg-amber-300 sm:inline-block sm:w-auto sm:px-8 sm:text-lg">
                Join the waitlist on WhatsApp&nbsp;→
              </span>
            </WhatsAppLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default function ChoppingBoardPage() {
  return (
    <main>
      <Hero />
      <WorkshopStrip />
      <WhyEndGrain />
      <HowItsMade />
      <Proof />
      <BoardSelection />
      <HowItWorks />
      <Faq />
    </main>
  );
}
