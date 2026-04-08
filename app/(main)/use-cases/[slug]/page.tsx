import './article.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getForPage, getAllForSlugs } from '../utils';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getAllForSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { frontMatter } = getForPage(slug);
  return { title: frontMatter.title, description: frontMatter.description };
}

export default async function ForPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { frontMatter, markdownContent } = getForPage(slug);

  if (!markdownContent) notFound();

  return (
    <>
      <div className='max-w-3xl mx-auto px-4 py-6'>
        <Link href='/use-cases'>
          <span className='text-blue-500 hover:underline mb-4 block'>← All Use Cases</span>
        </Link>

        <h1 className='text-3xl font-semibold mb-2'>{frontMatter.title}</h1>
        {frontMatter.description && (
          <p className='text-gray-500 mb-8'>{frontMatter.description}</p>
        )}

        <div className='article-container mt-2'>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownContent}</ReactMarkdown>
        </div>
      </div>

    </>
  );
}
