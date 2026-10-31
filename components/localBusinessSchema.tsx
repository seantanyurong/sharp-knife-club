import { SITE_URL } from '@/constants/site';

// Ties the site to the business behind the Google Business Profile.
// We're a pickup service with no shopfront, so there's no street address:
// areaServed covers the whole island instead.
export default function LocalBusinessSchema() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: 'Knife Sharpening Singapore',
    legalName: 'Knife Sharpening Singapore Pte. Ltd.',
    description:
      'Professional knife sharpening with free pickup and delivery islandwide. Kitchen knives, Japanese and German knives, scissors and serrated blades, returned within 24 hours.',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/opengraph-image.png`,
    telephone: '+6580684206',
    email: 'hello@knifesharpening.sg',
    priceRange: '$15–$20 per knife',
    areaServed: { '@type': 'Country', name: 'Singapore' },
    sameAs: ['https://www.instagram.com/knifesharpening.sg/'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
