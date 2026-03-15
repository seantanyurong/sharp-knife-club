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
  'german-knives': {
    headline: 'GERMAN KNIFE SHARPENING IN ONE DAY - FREE PICKUP & DELIVERY',
    title: 'German Knife Sharpening Singapore | Wüsthof, Zwilling & More',
    tile: {
      label: 'German Knives',
      tagline: 'Wüsthof, Zwilling, Henckels & more',
    },
    description:
      'Professional German knife sharpening in Singapore. Wüsthof, Zwilling, J.A. Henckels, Güde, and Messermeister — restored to factory edge. Free doorstep pickup & delivery.',
    intro: {
      heading: 'German Knife Sharpening in Singapore',
      body: 'We sharpen all major German knife brands — restoring the robust, slightly convex edge that makes German knives so reliable for everyday kitchen work.',
      bullets: [
        'Wüsthof Classic, Ikon & Grand Prix',
        'Zwilling J.A. Henckels',
        'Güde',
        'Messermeister',
        'Victorinox Fibrox',
        'Dick / F. Dick',
      ],
      whyItMatters: {
        heading: 'Why German Knives Need Proper Sharpening',
        paragraphs: [
          'German knives are built for durability — heavier, with a full bolster and a slightly convex "apple seed" edge ground at 15°–20° per side. This toughness means they hold up to hard use, but it also means they dull slowly and predictably. By the time a Wüsthof or Zwilling feels sluggish, the edge has often rolled rather than chipped — which responds well to sharpening but is easy to miss if you only use a honing rod.',
          'German steel (typically X50CrMoV15) is softer than Japanese steel, which makes it more forgiving but also means the edge deforms more under repeated use. Regular sharpening — not just honing — is what keeps these knives performing at their best.',
        ],
      },
      ourProcess: {
        heading: 'How We Sharpen German Knives',
        paragraphs: [
          'German knives are sharpened at 15°–20° per side to match the factory bevel. We use a professional belt sharpener to remove the rolled or dull edge, re-establish the bevel, and refine the edge to a polished finish. The convex geometry is maintained so the knife retains its characteristic feel and cutting performance.',
          'If the knife has a full bolster that has crept forward over years of use, we can reduce it so the blade makes full contact with the cutting board again — something most home sharpening tools cannot address.',
        ],
      },
      faqs: [
        {
          question: 'What angle do German knives use?',
          answer:
            'Most German knives are factory-ground at 15°–20° per side. Wüsthof uses 14° on their PEtec-sharpened blades; Zwilling typically uses 15°. We match the factory angle unless you request a specific preference.',
        },
        {
          question: 'My Wüsthof / Zwilling feels dull — is it a sharpening or honing issue?',
          answer:
            'Both, often. A honing rod realigns the edge between sharpenings but does not remove material. If regular honing is no longer restoring the edge, the knife needs sharpening. A good test: if the edge visibly reflects light along the cutting edge (a "white line"), the edge has rolled and sharpening is needed.',
        },
        {
          question: 'Can you sharpen knives with a full bolster?',
          answer:
            'Yes. If the bolster has built up over years of sharpening and prevents the heel from contacting the board, we can reduce it as part of the service. Let us know when you book and we will assess the knife.',
        },
        {
          question: 'How often should a German knife be sharpened?',
          answer:
            'For a home cook, once every 6–12 months depending on use. German knives are durable and hold an edge well, but regular honing between sharpenings will extend the interval. If you cook daily, lean toward 6 months.',
        },
        {
          question: 'Will sharpening remove the bolster finish or damage the handle?',
          answer:
            'Sharpening focuses on the blade edge and does not touch the bolster finish or handle. We take care not to damage the aesthetic of the knife during the process.',
        },
        {
          question: 'Is there a difference between sharpening Wüsthof vs Zwilling?',
          answer:
            'Both are German-style knives sharpened at similar angles, but Wüsthof\'s PEtec blades come factory-ground at 14° and Zwilling typically at 15°. The steel composition is also slightly different. We adjust our approach per knife to match the factory spec as closely as possible.',
        },
      ],
    },
  },
  'japanese-knives': {
    headline: 'JAPANESE KNIFE SHARPENING IN ONE DAY - FREE PICKUP & DELIVERY',
    title: 'Japanese Knife Sharpening Singapore | Global, Shun, MAC & More',
    tile: {
      label: 'Japanese Knives',
      tagline: 'Global, Shun, MAC, Miyabi & more',
    },
    description:
      'Professional Japanese knife sharpening in Singapore. Global, Shun, MAC, Miyabi, Tojiro, and more — sharpened at the correct angle with our professional belt sharpener. Free doorstep pickup & delivery.',
    intro: {
      heading: 'Japanese Knife Sharpening in Singapore',
      body: 'We sharpen all major Japanese knife brands at the precise angles they require — preserving the acute, fine edge that makes Japanese knives so exceptionally sharp.',
      bullets: [
        'Global (G-series, Ni-series)',
        'Shun Classic, Premier & Sora',
        'MAC Professional & Chef Series',
        'Miyabi Birchwood & 5000MCD',
        'Tojiro DP & Flash',
        'Masahiro & Kasumi',
      ],
      whyItMatters: {
        heading: 'Why Japanese Knives Need Specialist Sharpening',
        paragraphs: [
          'Japanese knives are made from harder steel (typically HRC 60–67) and are ground at a much more acute angle — 10°–15° per side — which is what gives them their exceptional sharpness. That same hardness makes the edge more brittle: it chips rather than rolls under hard use or improper sharpening.',
          'Using the wrong angle or a pull-through sharpener on a Japanese knife can chip the edge or permanently alter the geometry. These knives need to be sharpened at the correct angle with the right grit progression — and that is exactly what we do.',
        ],
      },
      ourProcess: {
        heading: 'How We Sharpen Japanese Knives',
        paragraphs: [
          'Japanese knives are sharpened using our professional belt sharpener at 10°–15° per side (or single-bevel for traditional Japanese knives like yanagiba and deba). We work through a grit progression — from repair or thinning if needed, through medium grits to establish the bevel, and finishing on a fine belt to produce the razor edge these knives are known for.',
          'Single-bevel knives (chisel-ground on one side only) require a different technique than double-bevel knives and are assessed individually. We check the ura (hollow back) and restore the edge geometry as closely as possible to the original.',
        ],
      },
      faqs: [
        {
          question: 'What angle do Japanese knives use?',
          answer:
            'Most double-bevel Japanese knives are ground at 10°–15° per side. Global uses 15°, Shun uses 16°, MAC uses 15°. Traditional single-bevel knives (yanagiba, deba, usuba) are 0° on one side and the full bevel angle on the other. We match the factory geometry for each brand.',
        },
        {
          question: 'Can you sharpen single-bevel Japanese knives?',
          answer:
            'Yes. Single-bevel knives like yanagiba, deba, and usuba require a specialist approach — sharpening only the bevel side and lightly flattening the ura (back) to remove the burr. This is different from double-bevel sharpening and is something we do regularly.',
        },
        {
          question: 'My Global / Shun knife chipped — can it be repaired?',
          answer:
            'In most cases yes, depending on the size of the chip. We can re-profile the edge to remove the damage, though this removes some material and may slightly shorten the blade over time. Large chips or structural damage may not be fully repairable without significant regrinding.',
        },
        {
          question: 'Can I use a pull-through sharpener on my Japanese knife?',
          answer:
            'We strongly advise against it. Pull-through sharpeners use a fixed angle that is typically too steep for Japanese knives and remove metal aggressively and unevenly. They can chip the hard steel edge and alter the blade geometry in ways that are difficult to correct. Use a honing rod (ceramic, not steel) for maintenance between professional sharpenings.',
        },
        {
          question: 'How often should a Japanese knife be sharpened?',
          answer:
            'Japanese knives hold a very fine edge, but that edge is more delicate. For a home cook, sharpening every 4–6 months is typical. If you use it daily or notice reduced performance, sharpen sooner. Regular stropping or light ceramic honing will extend the interval.',
        },
        {
          question: 'Is there a difference between sharpening Global vs Shun vs MAC?',
          answer:
            'Yes. Each brand uses different steel hardness, blade geometry, and factory angles. Global (Cromova 18 steel) is softer than Shun (VG-MAX) or MAC (proprietary high-carbon steel) and is more forgiving. Shun and MAC knives are harder and hold an edge longer but require more care during sharpening to avoid micro-chipping. We adjust our technique per brand.',
        },
      ],
    },
  },
};

export const getAllSharpenSlugs = (): string[] => Object.keys(SHARPEN_PAGES);

export const ADDON_PAGES: Record<string, BrowsePageConfig> = {
  derusting: {
    headline: 'KNIFE DE-RUSTING ADD-ON - FREE PICKUP & DELIVERY',
    title: 'Knife De-Rusting Singapore | Add-On Service | Knife Sharpening Singapore',
    tile: {
      label: 'De-Rusting',
      tagline: 'Remove rust from blades',
    },
    description:
      'Professional knife de-rusting in Singapore — available as an add-on with sharpening only. Remove surface rust and restore your blade. Free doorstep pickup & delivery.',
    intro: {
      heading: 'Knife De-Rusting in Singapore',
      body: 'De-rusting is available as an add-on service alongside sharpening — we do not offer it as a standalone. We remove surface rust from your blade and restore it before sharpening so you get a clean, sharp edge.',
      bullets: [
        'Carbon steel knives',
        'High-carbon stainless knives',
        'Japanese knives with surface oxidation',
        'Vintage or heirloom blades',
        'Kitchen cleavers',
        'Outdoor and camping knives',
      ],
      whyItMatters: {
        heading: 'Why Rust Needs to Be Treated Before Sharpening',
        paragraphs: [
          'Surface rust — especially on carbon steel — is common and does not mean the blade is ruined. But rust pits and oxidation along the edge interfere with sharpening: they prevent a clean bevel from forming and can leave microscopic weak spots in the edge. De-rusting before sharpening gives you a proper result, not just a sharp rusty knife.',
          'Left untreated, rust spreads into the steel. What starts as surface discolouration can become pitting that permanently weakens the blade. Catching it early keeps the knife in service for far longer.',
        ],
      },
      ourProcess: {
        heading: 'How We De-Rust',
        paragraphs: [
          'We remove surface rust mechanically and chemically, working progressively from affected areas without removing more metal than necessary. Once the blade is clean, we proceed with sharpening as normal. For heavily pitted blades, we will flag what is recoverable before proceeding.',
          'Note: deep pitting that has eaten into the steel cannot be fully reversed — we can remove the rust but the pits remain. We will let you know the condition of the blade after assessment.',
        ],
      },
      faqs: [
        {
          question: 'Is de-rusting available as a standalone service?',
          answer:
            'No — de-rusting is an add-on service only, available alongside sharpening. We combine both steps so the blade is clean and sharp when returned to you.',
        },
        {
          question: 'My knife has surface rust spots — is it still usable?',
          answer:
            'Surface rust on carbon steel is common and does not make a knife unsafe to use on food, but it should be treated. Rust that is only on the surface can be fully removed. If rust has progressed to pitting, the pits remain after de-rusting but the blade is clean and safe again.',
        },
        {
          question: 'What types of knives rust?',
          answer:
            'Carbon steel knives rust the most readily — this includes many traditional Japanese knives (blue steel, white steel), Chinese cleavers, and vintage Western knives. High-carbon stainless knives can also develop rust spots, especially if stored wet or in humid conditions. Standard stainless steel knives (like most German brands) are much more resistant but not fully immune.',
        },
        {
          question: 'Can all rust be removed?',
          answer:
            'Surface rust — rust that sits on top of the steel — can be fully removed. Deep pitting, where rust has eaten into the metal, cannot be reversed. The rust can be removed but the pits remain. We assess each blade and let you know what to expect before proceeding.',
        },
        {
          question: 'How do I prevent rust after de-rusting?',
          answer:
            'Dry your knife immediately after washing — never leave it wet or in a damp drawer. For carbon steel knives, a light coat of food-safe mineral oil or camellia oil after drying will protect the surface. Store in a knife block or on a magnetic strip, not in a humid environment.',
        },
        {
          question: 'Will de-rusting affect the blade finish or appearance?',
          answer:
            'The rust and any discolouration will be removed, which may leave the blade looking slightly different from when it was new — especially on patina that has built up on carbon steel. We work to preserve the blade surface where possible, but the primary goal is to remove the rust cleanly.',
        },
      ],
    },
  },
  'chip-repairs': {
    headline: 'KNIFE CHIP REPAIR ADD-ON - FREE PICKUP & DELIVERY',
    title: 'Knife Chip Repair Singapore | Add-On Service | Knife Sharpening Singapore',
    tile: {
      label: 'Chip Repairs',
      tagline: 'Fix chips on blades',
    },
    description:
      'Professional knife chip repair in Singapore — available as an add-on with sharpening only. We re-profile chipped edges and restore the blade before finishing with a sharp edge. Free doorstep pickup & delivery.',
    intro: {
      heading: 'Knife Chip Repair in Singapore',
      body: 'Chip repair is available as an add-on service alongside sharpening — not as a standalone. We re-grind the edge to remove chips and damage, then sharpen to a clean finish.',
      bullets: [
        'Chipped chef knives',
        'Damaged Japanese knives',
        'Knives with rolled or broken tips',
        'Blades with multiple edge chips',
        'Cleavers with edge damage',
        'Knives dropped onto hard surfaces',
      ],
      whyItMatters: {
        heading: 'Why Chips Cannot Be Honed or Sharpened Away',
        paragraphs: [
          'A chip is physical damage to the blade steel — a piece of the edge has broken off, leaving a notch. No amount of honing or standard sharpening will fix this: a honing rod only realigns the edge, and a standard sharpen only removes a thin layer of metal. To remove a chip, material needs to be ground away until the edge is below the deepest point of the chip.',
          'Leaving chips in the edge means the knife cuts unevenly — the chipped section cannot contact food properly, which puts more pressure on the surrounding edge and accelerates wear. Repairing chips early extends the blade\'s life and restores consistent cutting performance.',
        ],
      },
      ourProcess: {
        heading: 'How We Repair Chips',
        paragraphs: [
          'We use our belt sharpener to re-profile the edge — removing metal progressively until the chip is fully gone and a clean, straight bevel is established across the full length of the blade. For large chips or tip damage, more material needs to be removed, which may slightly shorten the blade. We assess each knife before proceeding and let you know what to expect.',
          'Once the chip is removed and the bevel re-established, we sharpen the edge to a clean, refined finish — so the knife comes back both repaired and sharp.',
        ],
      },
      faqs: [
        {
          question: 'Is chip repair available as a standalone service?',
          answer:
            'No — chip repair is an add-on service only, available alongside sharpening. Repairing a chip requires re-profiling the edge, which leaves the blade needing a finish sharpen anyway, so both are done together.',
        },
        {
          question: 'How big a chip can you repair?',
          answer:
            'We can repair most chips, including large ones. The limiting factor is how much material needs to be removed — larger chips mean more metal is ground away, which may slightly shorten the blade length or change the blade height near the heel. We assess each knife first and flag anything significant before proceeding.',
        },
        {
          question: 'My knife tip broke off — can it be repaired?',
          answer:
            'Yes. A broken tip can be re-ground into a new tip, though the blade will be slightly shorter. The new tip is re-profiled to a clean point. The result is a slightly shorter knife with a fully functional tip — not a blunt or damaged one.',
        },
        {
          question: 'Why did my knife chip in the first place?',
          answer:
            'Chips usually happen when the blade contacts something hard — a bone, a frozen food, a ceramic plate, or a hard cutting board. Japanese knives (harder steel, more brittle) chip more easily than German knives. Dropping a knife onto a hard floor is another common cause. Using the correct technique and a wooden or plastic cutting board reduces the risk significantly.',
        },
        {
          question: 'Will chip repair shorten my knife?',
          answer:
            'Chip repair removes material from the edge, which may slightly reduce blade height — especially for chips near the heel. For most chips, the reduction is minimal and not noticeable in use. Large chips or broken tips may result in a more visible change. We will tell you before we proceed if the change will be significant.',
        },
        {
          question: 'My knife has several chips along the edge — is it worth repairing?',
          answer:
            'Usually yes, if the blade is otherwise in good condition. Multiple chips require more material removal, but a quality knife is worth repairing over replacing. The exception is if the blade has significant structural damage or the steel is heavily compromised — in that case, we will flag it and let you decide.',
        },
      ],
    },
  },
};

export const getAllAddonSlugs = (): string[] => Object.keys(ADDON_PAGES);
