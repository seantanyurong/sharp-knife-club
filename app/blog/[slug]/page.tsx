import { Metadata } from 'next';

import Article from './article';
import { getArticle } from '../utils';

import { NEXT_PICKUP_DATE } from '@/constants/dates';

export const revalidate = 600;

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {  
  const { slug } = await params;

  const articleInfo = getArticle(slug)
  const { frontMatter: metadata, markdownContent: article } = articleInfo

  if (metadata && article) {
    return {
      title: metadata.title,
      description: article.slice(0, 250),
      openGraph: {
        type: 'article',
        title: metadata.title,
        description: article.slice(0, 250),
        url: `https://www.knifesharpening.sg/blog/${slug}`,
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
      <div className='max-w-3xl mx-auto p-6'>

        <h1 className='text-3xl font-semibold mb-4'>{metadata.title}</h1>
        <p className='text-sm text-gray-500 mb-8'>{metadata.publishedAt}</p>

        <Article text={article} />

        <p className='text-sm text-gray-500 mb-8'><i>We are currently only operating in Singapore. Our next pick up will be on {`${NEXT_PICKUP_DATE}`}.</i></p>
      </div>
    </>

  );
}
