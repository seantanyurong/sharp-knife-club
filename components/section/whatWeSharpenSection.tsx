import Link from 'next/link';
import { SHARPEN_PAGES } from '@/constants/browse-pages';

export default function WhatWeSharpenSection() {
  const pages = Object.entries(SHARPEN_PAGES);

  return (
    <div className='bg-muted py-12 px-6'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-2xl md:text-3xl text-primary font-black text-center mb-2'>WHAT WE SHARPEN</h2>
        <p className='text-center text-gray-600 mb-8'>Click to learn more about each service</p>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {pages.map(([slug, page]) => (
            <Link key={slug} href={`/sharpen/${slug}`}>
              <div className='bg-white rounded-lg p-5 border border-gray-200 hover:border-primary hover:shadow-md transition-all h-full'>
                <p className='font-black text-primary text-lg'>{page.tile.label}</p>
                <p className='text-sm text-gray-500 mt-1'>{page.tile.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
