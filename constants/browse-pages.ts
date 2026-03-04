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
    headline: 'SCISSORS SHARPENING IN ONE DAY — FREE PICKUP & DELIVERY',
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
      body: 'Knife Sharpening Singapore sharpens all types of scissors with free doorstep pickup and same-day delivery across Singapore. We restore a clean, precise edge so every cut is effortless — no more tearing, crushing, or dragging.',
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
          'Dull scissors do not just slow you down — they actively cause damage. Fabric scissors that have lost their edge crush and fray fibres instead of slicing through them cleanly, which ruins garments and wastes material. Kitchen shears that are past their prime tear food rather than cutting it, making prep messier and less precise. Hair scissors that drag rather than glide pull strands instead of cutting them, leading to uneven results and discomfort for whoever is in the chair.',
          'The consequences of a dull edge are different for each type of scissors, but the root cause is always the same: the blade angle has degraded and can no longer make a clean shear. Professional sharpening restores that angle precisely — not just removes metal until something vaguely cuts again.',
        ],
      },
      ourProcess: {
        heading: 'How We Sharpen Scissors',
        paragraphs: [
          'Scissors have a single-bevel edge — each blade is ground on one side only, unlike kitchen knives which are typically bevelled on both sides. This means sharpening scissors correctly requires a different technique and a higher angle, usually between 30° and 45°, compared to the 15°–20° used for most knives. We sharpen each blade individually to maintain the factory bevel, then check the blade tension and alignment before reassembly.',
          'We test every pair on paper and fabric before returning them. If a pair of kitchen shears has a micro-serrated blade, we sharpen only the smooth blade and leave the serrations intact — removing them would change how the shear performs on poultry and tough cuts.',
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
      ],
    },
  },
  serrated: {
    headline: 'SERRATED KNIFE SHARPENING IN ONE DAY — FREE PICKUP & DELIVERY',
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
      heading: 'Professional Serrated Knife Sharpening in Singapore',
      body: 'Knife Sharpening Singapore sharpens serrated knives with free doorstep pickup and same-day delivery across Singapore. Bread knives, tomato knives, steak knives — we restore the cutting performance of every serration so your knife glides through crusts and skins again.',
      bullets: [
        'Bread knives',
        'Tomato knives',
        'Steak knives',
        'Utility knives',
        'Offset serrated knives',
        'Serrated chef knives',
      ],
      whyItMatters: {
        heading: 'Why Serrated Knives Still Need Sharpening',
        paragraphs: [
          'Serrated knives have a reputation for staying sharp longer than straight-edge blades — and that is partly true. The pointed serrations act like micro-saws, concentrating cutting force on a small area, which means each serration wears down more slowly. But they do dull over time. A bread knife that once glided through a sourdough crust without pressure now crushes and tears the loaf. A tomato knife that used to pierce skin on contact now slides off. That is the sign of a serrated knife that needs professional attention.',
          'The problem with dull serrated knives is that most people notice too late. Because they still technically cut, the gradual loss of performance is easy to overlook — until the knife is so far gone that it damages whatever you are cutting rather than slicing through it cleanly.',
        ],
      },
      ourProcess: {
        heading: 'How We Sharpen Serrated Knives',
        paragraphs: [
          'Sharpening serrated knives cannot be done on a flat whetstone the way straight-edge knives are sharpened. Each individual serration must be sharpened separately using a tapered diamond rod that matches the radius of the gullet. We work through every serration along the bevelled side of the blade, restoring the original angle and removing any flat spots or micro-chips. Once the serrations are done, we lightly hone the flat back of the blade to remove the burr raised during sharpening.',
          'The goal is to restore the original factory geometry — not remove material aggressively or change the serration shape. Done correctly, a sharpened serrated knife performs like new and lasts many more years without needing replacement.',
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
      ],
    },
  },
};

export const getAllSharpenSlugs = (): string[] => Object.keys(SHARPEN_PAGES);
