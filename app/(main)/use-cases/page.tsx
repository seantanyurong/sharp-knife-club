import { getAllForSlugs, getForPage } from './utils';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Who We Sharpen For | Knife Sharpening Singapore',
  description: 'Professional sharpening for restaurants, hair salons, barbers, and pet groomers in Singapore. Free pickup and delivery, 1-day turnaround.',
};

const USE_CASE_ICONS: Record<string, string> = {
  restaurants: '🍽️',
  salons: '✂️',
  'pet-groomers': '🐾',
};

export default function UseCasesPage() {
  const slugs = getAllForSlugs();
  const pages = slugs.map(slug => ({ slug, frontMatter: getForPage(slug).frontMatter }));

  return (
    <div className='max-w-3xl mx-auto px-4 py-12'>
      <h1 className='text-3xl font-semibold mb-2'>Who We Sharpen For</h1>
      <p className='text-gray-500 mb-10'>
        We work with home cooks, professionals, and businesses across Singapore. Free pickup and delivery, returned within one day.
      </p>

      <div className='flex flex-col gap-4'>
        {pages.map(({ slug, frontMatter }) => (
          <Link key={slug} href={`/use-cases/${slug}`}>
            <div className='border rounded-lg p-6 hover:border-gray-400 transition-colors'>
              <div className='flex items-center gap-3 mb-2'>
                <span className='text-2xl'>{USE_CASE_ICONS[slug] ?? '🔪'}</span>
                <h2 className='text-xl font-semibold'>{frontMatter.title}</h2>
              </div>
              <p className='text-gray-500 text-sm'>{frontMatter.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
