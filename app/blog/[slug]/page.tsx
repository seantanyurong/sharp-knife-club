import { Metadata } from 'next';

import Article from './article';
import { getArticle } from '../utils';

export const revalidate = 600;

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {  
  const { slug } = await params;
  console.log(slug)

  const articleInfo = getArticle(slug)
  const { frontMatter: metadata, markdownContent: article } = articleInfo

  console.log(metadata)
  console.log(article.slice(0,100))

  if (metadata && article) {
    return {
      title: metadata.title,
      description: article.slice(0, 250),
      openGraph: {
        type: 'article',
        title: metadata.title,
        description: article.slice(0, 250),
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

  console.log("ARTICLE")
  console.log(metadata)
  console.log(article.slice(0, 100))

  return (
    <>
      <div className='max-w-3xl mx-auto p-6'>

        <h1 className='text-3xl font-semibold mb-4'>{metadata.title}</h1>
        <p className='text-sm text-gray-500 mb-8'>{metadata.publishedAt}</p>

        <Article text={article} />

        <p className='text-sm text-gray-500 mb-8'><i>We are currently only operating in Singapore. Our next pick up will be on 1st Feb 2025.</i></p>
      </div>
    </>

  );
}
