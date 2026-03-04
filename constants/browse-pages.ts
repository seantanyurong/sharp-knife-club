export type BrowseFaq = {
  question: string;
  answer: string;
};

export type BrowsePageConfig = {
  headline: string;
  title: string;
  description: string;
  tile: {
    label: string;
    tagline: string;
  };
  overrides?: {
    instructions?: {
      stepDescriptions?: [string?, string?, string?];
    };
    pricing?: {
      note?: string;
    };
  };
  intro: {
    heading: string;
    body: string;
    bullets: string[];
    whyItMatters: {
      heading: string;
      paragraphs: string[];
    };
    ourProcess: {
      heading: string;
      paragraphs: string[];
    };
    faqs: BrowseFaq[];
  };
};

export const SHARPEN_PAGES: Record<string, BrowsePageConfig> = {
  scissors: {
    headline: 'SCISSORS SHARPENING IN ONE DAY - FREE PICKUP & DELIVERY',
    title: 'Scissors Sharpening Singapore | Knife Sharpening Singapore',
    tile: {
      label: 'Scissors',
      tagline: 'Kitchen shears, fabric, hair & more',
    },
    description:
      'Professional scissors sharpening in Singapore with free doorstep pickup & delivery. Same-day turnaround from $15 per blade.',
    overrides: {
      instructions: {
        stepDescriptions: [
          "Leave your scissors at your doorstep and we'll swing by to collect them!",
          "Our expert craftsmen will restore your scissors' edges till they're razor sharp. That's a Knife Sharpening Singapore Guarantee!",
          'We will drop them off within 24 hours at your doorstep, and you will be cutting and snipping with a fresh edge again.',
        ],
      },
      pricing: {
        note: 'Min. 3 blades (kitchen shears, fabric scissors, hair scissors, etc.). Free pickup and delivery.',
      },
    },
    intro: {
      heading: 'Professional Scissors Sharpening in Singapore',
      body: 'We sharpen all types of scissors — restoring a clean, precise edge so every cut is effortless. No more tearing, crushing, or dragging.',
      bullets: [
        'Kitchen shears',
        'Fabric & sewing scissors',
        'Hair scissors',
        'Nail scissors',
        'Craft scissors',
        'Garden snips',
      ],
      whyItMatters: {
        heading: 'Why Sharp Scissors Matter',
        paragraphs: [
          'Dull scissors actively damage what they cut. Fabric frays instead of slicing cleanly. Hair gets pulled instead of cut. Food gets torn instead of separated. The damage is often immediate and visible — unlike a dull knife, which mostly just slows you down.',
        ],
      },
      ourProcess: {
        heading: 'What Makes Scissors Different',
        paragraphs: [
          'Scissors use a single-bevel edge at a steeper angle (30°–45°) than a typical kitchen knife. Each blade must be sharpened individually, and blade tension needs to be checked before reassembly — small details that determine whether the scissors shear cleanly or snag.',
        ],
      },
      faqs: [
        {
          question: 'Can you sharpen both blades of a pair of scissors?',
          answer:
            'Yes. We disassemble the scissors where possible and sharpen each blade individually. This gives a more precise edge than sharpening with the blades assembled, and allows us to check and adjust the blade tension before returning them.',
        },
        {
          question: 'My scissors cut paper fine but not fabric — why?',
          answer:
            'Paper is more forgiving than fabric. A slightly dull edge will still cut paper but will crush or fray fabric fibres instead of slicing through them. If your scissors are struggling with fabric, they need sharpening — not just a quick clean.',
        },
        {
          question: 'My hair scissors pull instead of cut — can sharpening fix this?',
          answer:
            'Usually yes. Hair scissors that pull or drag are almost always dull. Sharpening restores the fine edge needed to slice individual hair strands cleanly. If the blades are warped or the tension is off, we will flag that before returning them.',
        },
        {
          question: 'How often should scissors be sharpened?',
          answer:
            'It depends on how often they are used and what they cut. Fabric scissors used regularly should be sharpened every 6–12 months. Kitchen shears every 3–6 months. Hair scissors used professionally can need sharpening every 2–3 months. A good rule of thumb: if they are tearing instead of cutting, it is time.',
        },
        {
          question: 'Do you sharpen scissors with serrated blades?',
          answer:
            'We sharpen the non-serrated blade and lightly hone the flat side of the serrated blade to remove burrs. We do not grind the serrations themselves — removing them would change how the scissor performs and is not recommended.',
        },
        {
          question: 'Why do different types of scissors fail differently when dull?',
          answer:
            'Each type of scissors is used differently, so dullness shows up differently. Fabric scissors crush and fray fibres because fabric requires a very fine, clean slice. Kitchen shears tear food because they need enough sharpness to cut through cartilage and skin. Hair scissors pull strands because the edge needs to be fine enough to cut individual hairs cleanly. The blade angle required for each type also differs slightly, which is why professional sharpening tailored to the scissor type produces better results than a generic sharpen.',
        },
      ],
    },
  },
  serrated: {
    headline: 'SERRATED KNIFE SHARPENING IN ONE DAY - FREE PICKUP & DELIVERY',
    title: 'Serrated Knife Sharpening Singapore | Knife Sharpening Singapore',
    tile: {
      label: 'Serrated Knives',
      tagline: 'Bread knives, steak knives & more',
    },
    description:
      'Professional serrated knife sharpening in Singapore with free doorstep pickup & delivery. Bread knives, steak knives, and more — same-day turnaround.',
    overrides: {
      instructions: {
        stepDescriptions: [
          undefined,
          "Our expert knifesmiths will restore every serration till your blade cuts like new. That's a Knife Sharpening Singapore Guarantee!",
          'We will drop them off within 24 hours at your doorstep, and you will be slicing through bread and tough cuts with a fresh edge again.',
        ],
      },
      pricing: {
        note: 'Min. 3 blades (bread knives, steak knives, serrated chef knives, etc.). Free pickup and delivery.',
      },
    },
    intro: {
      heading: 'More About Serrated Knives',
      body: 'We restore every serration so your blade glides through crusts, skins, and tough cuts again instead of tearing through them.',
      bullets: [
        'Bread knives',
        'Tomato knives',
        'Steak knives',
        'Utility knives',
        'Offset serrated knives',
        'Serrated chef knives',
      ],
      whyItMatters: {
        heading: 'Why Serrated Knives Still Dull',
        paragraphs: [
          'Serrations dull slowly, so the decline is easy to miss. By the time a bread knife is crushing the loaf instead of slicing it, or a tomato knife is sliding off the skin, the edge has already degraded significantly. They still technically cut — just not cleanly.',
        ],
      },
      ourProcess: {
        heading: 'What Makes Serrated Knives Different',
        paragraphs: [
          'A flat whetstone cannot reach inside the serrations. Each gullet must be sharpened individually with a tapered rod matched to its radius — restoring the original bevel angle without altering the serration shape or spacing.',
        ],
      },
      faqs: [
        {
          question: 'Can all serrated knives be sharpened?',
          answer:
            'Most serrated knives can be sharpened as long as the serrations are not severely deformed or the blade is not structurally damaged. Standard bread knives, tomato knives, and steak knives with single-bevel serrations are all straightforward to sharpen. If the serrations are very fine or micro-scalloped (common on some Japanese blades), contact us first with a photo and we will confirm.',
        },
        {
          question: 'Will sharpening remove the serrations?',
          answer:
            'No. We sharpen each serration individually using a tapered rod that fits the gullet. This restores the edge without changing the shape or depth of the serrations. The serrations remain intact — they are just sharp again.',
        },
        {
          question: 'Is it worth sharpening a serrated knife, or should I just replace it?',
          answer:
            'If the serrations are intact and the knife is otherwise in good condition, sharpening is almost always worth it. A quality bread knife sharpened professionally will outlast several cheap replacements. The only case where replacement makes more sense is if the serrations are physically broken, the blade is badly warped, or the knife was inexpensive to begin with.',
        },
        {
          question: 'How often should serrated knives be sharpened?',
          answer:
            'Less often than straight-edge knives. For a home cook using a bread knife a few times a week, once every 1–2 years is usually sufficient. If you notice the knife crushing bread instead of slicing it, or struggling to pierce tomato skin, it is time.',
        },
        {
          question: 'Can I sharpen my serrated knife myself at home?',
          answer:
            'Technically yes, with a tapered ceramic or diamond rod. But it is time-consuming, easy to do unevenly, and mistakes can permanently alter the serration geometry. Most people find it not worth the effort compared to a professional service — especially for quality knives.',
        },
        {
          question: 'What happens if a serrated knife goes too long without sharpening?',
          answer:
            'The serrations develop flat spots and micro-chips that worsen with use. At that point the knife does not just cut poorly — it actively damages food, crushing bread instead of slicing it and tearing tomato skin instead of piercing it cleanly. The longer it is left, the more material needs to be removed to restore the edge, which shortens the blade\'s overall lifespan.',
        },
      ],
    },
  },
};

export const getAllSharpenSlugs = (): string[] => Object.keys(SHARPEN_PAGES);
