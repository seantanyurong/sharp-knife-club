import Link from "next/link";
import PostHogEventCapture from "@/components/ui/posthogeventcapture";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export type FAQ = {
  slug: string;
  question: string;
  answer: React.ReactNode;
  plainTextAnswer: string;
};

const ALL_FAQS: FAQ[] = [
  {
    slug: "how-we-sharpen",
    question: "How do you sharpen my knives?",
    answer: (
      <>
        <p>
          We use a belt sharpener. Precision is our top priority – we take great care in ensuring the angle is
          optimal. This approach ensures not only the sharpest edge but also minimizes the amount of metal
          removed, prioritizing the longevity of your blades.
        </p>
        <br></br>
        <p>
          To guarantee optimal performance, we will test every knife on paper to ensure it slices
          effortlessly. Your satisfaction and the functionality of your blades are of utmost importance to us.
        </p>
      </>
    ),
    plainTextAnswer:
      "We use a precision belt sharpener to achieve the optimal angle, removing minimal metal for blade longevity. Every knife is paper-tested for effortless slicing. Ultra fine diamond whetstone finishing up to 50,000 grit with custom angles is available for $20 per knife.",
  },
  {
    slug: "why-sharpen",
    question: "Why should I sharpen my knives?",
    answer: (
      <>
        <ul className='list-disc pl-5'>
          <li className='mb-4'>
            <b>Enjoyable:</b> Cooking with dull knives is frustrating and time-consuming. Make cooking
            pleasurable and faster with sharp knives.
          </li>
          <li className='mb-4'>
            <b>Safer:</b> A dull knife is the main reason for knife-related incidents. Stay safe by keeping
            your knives sharp.
          </li>{' '}
          <li className=''>
            <b>Tastier:</b> Sharp knives will cause the smallest amount of damage and conserve the oils,
            flavors and nutrients in your food.
          </li>{' '}
        </ul>
      </>
    ),
    plainTextAnswer:
      "Sharp knives make cooking faster and more enjoyable, reduce the risk of accidents, and preserve the oils, flavors, and nutrients in your food.",
  },
  {
    slug: "why-us",
    question: "Why choose Knife Sharpening Singapore?",
    answer: (
      <ul className='list-disc pl-5'>
        <li className='mb-4'>
          <b>Convenience:</b> We make it easy for you. With door-to-door pick up and drop off, you can get
          your knives sharpened without ever leaving your home.
        </li>
        <li className='mb-4'>
          <b>Guaranteed Satisfaction:</b> We stand behind our work with confidence. If your knives aren’t
          sharper than the day you bought them, we’ll make it right – no questions asked.
        </li>{' '}
        <li className=''>
          <b>Expert Craftsmanship:</b> Our sharpening process is more than just a quick fix. We use
          traditional techniques and the finest grit to ensure a razor-sharp edge with a flawless finish.
        </li>{' '}
      </ul>
    ),
    plainTextAnswer:
      "We offer door-to-door pickup and delivery, a satisfaction guarantee if your knives aren’t sharper than new, and expert craftsmanship using traditional techniques with the finest grit for a flawless edge.",
  },
  {
    slug: "turnaround-time",
    question: "How long does sharpening take?",
    answer: (
      <>
        All orders are sharpened, carefully inspected, and returned to your doorstep within 24 hours of pickup — anywhere in Singapore.
        We aim for speed without compromising quality, so your knives come back sharp, safe, and ready to use the very next day.
      </>
    ),
    plainTextAnswer: "All orders are sharpened, inspected, and returned to your doorstep within 24 hours of pickup.",
  },
  {
    slug: "pricing",
    question: "How much does it cost?",
    answer: (
      <>
        Pricing is based on the number of knives and the type of work required. Additional charges may apply for serrated knives, chipped blades, tip repairs, or special requests.
        To give you the most accurate quote, we recommend sending us a photo of your knives before pickup.
      </>
    ),
    plainTextAnswer:
      "Pricing is based on the number of knives and work required, with additional charges for serrated or damaged blades; contact us with a photo for a quote.",
  },
  {
    slug: "pickup-delivery",
    question: "Do you offer pick-up and delivery?",
    answer: (
      <>
        Yes — we provide convenient, door-to-door pickup and return anywhere in Singapore.
        Simply prepare your knives, and our driver will collect and return them within 24 hours. No need to visit a shop.
      </>
    ),
    plainTextAnswer:
      "Yes, we provide convenient, door-to-door pickup and return anywhere in Singapore within 24 hours.",
  },
  {
    slug: "serrated-knives",
    question: "Can you sharpen serrated knives?",
    answer: (
      <>
        Yes. We hand-sharpen serrations with precision tools to maintain their original shape and cutting performance.
        This process is more time-intensive than sharpening a straight edge, so a small additional fee applies.
      </>
    ),
    plainTextAnswer: "Yes, we hand-sharpen serrations to maintain their shape, with a small additional fee.",
  },
  {
    slug: "chipped-damaged",
    question: "Can you fix chips or damaged edges?",
    answer: (
      <>
        Yes. Minor chips are included in our standard sharpening service. For deeper chips, broken tips, or severe damage,
        we’ll assess the blade first and let you know if there’s an extra cost before we begin repairs.
      </>
    ),
    plainTextAnswer:
      "Yes, minor chips are included in standard sharpening; deeper chips or tip repairs are priced after assessment.",
  },
  {
    slug: "how-often",
    question: "How often should I sharpen my knives?",
    answer: (
      <>
        For most home cooks, sharpening every 3–6 months keeps knives performing at their best.
        If you cook daily, prepare large amounts of food, or often cut through harder ingredients like squash or bone-in meat,
        you may benefit from sharpening more frequently to maintain safety and efficiency.
      </>
    ),
    plainTextAnswer:
      "Home cooks should sharpen every 3–6 months; frequent cooks or those handling tougher ingredients may need it more often.",
  },
  {
    slug: "payment",
    question: "What payment methods do you accept?",
    answer: (
      <>
        We currently accept PayNow for all transactions. Payment can be made easily after your service is confirmed.
      </>
    ),
    plainTextAnswer: "We currently accept PayNow for all transactions.",
  },
  {
    slug: "guarantee",
    question: "Do you guarantee your work?",
    answer: (
      <>
        Absolutely. If you’re not satisfied with the sharpening, we’ll re-sharpen at no extra cost or provide a refund.
        Our goal is to make sure you’re happy with both the edge and the service experience.
      </>
    ),
    plainTextAnswer: "Yes, if you’re not satisfied, we’ll re-sharpen for free or provide a refund.",
  },
  {
    slug: "what-we-sharpen",
    question: "Do you handle scissors or other tools?",
    answer: (
      <>
        Yes — we sharpen kitchen knives, scissors, and selected tools.
        If you’re unsure whether we can service a specific item, send us a photo and we’ll confirm before pickup.
      </>
    ),
    plainTextAnswer: "Yes, we sharpen kitchen knives, scissors, and selected tools; contact us to confirm.",
  },
  {
    slug: "prep-for-pickup",
    question: "How should I prepare knives for pickup?",
    answer: (
      <>
        Wipe blades clean to remove any food residue. If you have sheaths, use them for added safety.
        Otherwise, wrap each knife in a clean towel or cloth, and place them securely in a sturdy bag.
        We will also provide a video guide a day before pickup.
      </>
    ),
    plainTextAnswer:
      "Wipe blades clean, sheath if possible, wrap in a towel or cloth, and place in a sturdy bag for collection.",
  },
  {
    slug: "business-bulk",
    question: "Do you work with restaurants or handle bulk orders?",
    answer: (
      <>
        Yes — we offer scheduled pickups, priority turnaround, and volume pricing for restaurants, cafés, caterers, and other F&B businesses.
        Regular sharpening ensures consistency, safety, and peak performance in professional kitchens.
      </>
    ),
    plainTextAnswer: "Yes, we offer scheduled pickups, priority turnaround, and volume pricing for F&B businesses.",
  },
  {
    slug: "polishing",
    question: "Do you offer knife polishing?",
    answer: (
      <>
        No, we do not offer cosmetic polishing. Our service focuses on restoring the cutting performance of your knife through precise sharpening,
        rather than buffing or refinishing the blade’s surface.
      </>
    ),
    plainTextAnswer: "No, we do not offer cosmetic polishing; we focus solely on restoring cutting performance through sharpening.",
  },
];

function FAQSchema({ faqs }: { faqs: FAQ[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.plainTextAnswer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function FaqSection({ homepage = false }: { homepage?: boolean }) {
  const faqs = homepage ? ALL_FAQS.slice(0, 3) : ALL_FAQS;

  return (
    <section className="bg-muted py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl text-primary font-black text-center">Frequently Asked Questions</h1>

        <FAQSchema faqs={faqs} />

        <Accordion type="single" collapsible className="w-full mt-6 text-base">
          {faqs.map((f, idx) => (
            <PostHogEventCapture key={f.slug} name="faq" origin={f.slug}>
              <AccordionItem value={`item-${idx + 1}`} id={f.slug}>
                <AccordionTrigger>{f.question}</AccordionTrigger>
                <AccordionContent>
                  <div className="prose prose-sm max-w-none text-foreground">{f.answer}</div>
                </AccordionContent>
              </AccordionItem>
            </PostHogEventCapture>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
