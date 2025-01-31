import React from 'react';

import { Metadata } from 'next';
import Image from 'next/image';

import Article from './article';
import Logo from '../../../public/logo.png';
import { Button } from '@/components/ui/button';
import { getArticle } from '../utils';

export const revalidate = 600;

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
  const { slug } = await params;
  const articleInfo = getArticle(slug)
  const { frontMatter: metadata, markdownContent: article } = articleInfo

  if (metadata && article) {
    return {
      title: metadata.title,
      description: 'Default Description',
      openGraph: {
        type: 'article',
        title: metadata.title,
        description: 'Default Description',
        url: `https://knifesharpening.sg/blog/${slug}`,
        siteName: 'Knife Sharpening Singapore Blog',
        images: []
      },
    };
  }
  return {
    title: "No article found",
    description: "No article found",
  };
};

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const articleInfo = getArticle(slug)
  const { frontMatter: metadata, markdownContent: article } = articleInfo

  return (
    <>
      <div className='bg-primary text-primary-foreground py-4 md:py-6 px-6'>
        <div className='max-w-6xl flex justify-between items-center mx-auto'>
          <Image src={Logo} alt='Knife Sharpening Singapore' width={180} height={180} priority />
          <div className='flex gap-6'>
            <a href='https://wa.me/message/LQDK2KE5I3PNF1' className='items-center gap-1 hidden md:flex'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-brand-whatsapp text-primary-foreground h-8 w-8'
                width='44'
                height='44'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='#f8fafc'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9' />
                <path d='M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1' />
              </svg>
              <p className='text-lg font-semibold'>(65) 8068 4206</p>
            </a>
            <a href='https://wa.me/message/LQDK2KE5I3PNF1'>
              <Button variant={'secondary'} size={'lg'} className='text-lg font-semibold hidden md:block'>
                Sharpen Knife
              </Button>
            </a>
            <a href='https://wa.me/message/LQDK2KE5I3PNF1'>
              <Button variant={'secondary'} size={'sm'} className='text-sm font-semibold block md:hidden'>
                Sharpen Knife
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div className='max-w-3xl mx-auto p-6'>

        <h1 className='text-3xl font-semibold mb-4'>{metadata.title}</h1>
        <p className='text-sm text-gray-500 mb-8'>{metadata.publishedAt}</p>

        <Article text={article} />

        <p className='text-sm text-gray-500 mb-8'><i>We are currently only operating in Singapore. Our next pick up will be on 1st Feb 2025.</i></p>
      </div>

      <footer>
        <div className='max-w-2xl mx-auto pb-16 px-6'>
          <p className='text-center text-sm text-gray-500 mb-1 font-bold'>Knife Sharpening Singapore.</p>
          <p className='text-center text-sm text-gray-500 mb-1'>
            Professional knife sharpening, picked up & delivered.
          </p>
          <p className='text-center text-sm text-gray-500'>&copy; 2024. All rights reserved.</p>
        </div>
      </footer>
      <a href='https://wa.me/message/LQDK2KE5I3PNF1'>
        <Button size={'lg'} className='text-lg font-semibold hidden md:block fixed bottom-6 right-6'>
          Sharpen Knife
        </Button>
      </a>
      <a href='https://wa.me/message/LQDK2KE5I3PNF1'>
        <Button size={'sm'} className='text-sm font-semibold block md:hidden fixed bottom-4 right-4'>
          Sharpen Knife
        </Button>
      </a>
    </>

  );
}
