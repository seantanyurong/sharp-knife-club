import Image from 'next/image';
import Link from 'next/link';

import { getAllArticles } from './utils';

export default async function ArticleCards() {
    const articles = getAllArticles()

  const renderArticleCards = () => {
    if (!articles) {
      return <p>No events found.</p>;
    }

    return articles
      .sort(function (a, b) {
        return new Date(b.frontMatter.publishedAt).getTime() - new Date(a.frontMatter.publishedAt).getTime();
      })
      .map((article) => {
        const { frontMatter } = article;
        const { title, publishedAt, slug } = frontMatter

        return (
          <Link href={`/blog/${slug}`} key={slug} className='flex justify-center'>
            <div className='inline-block'>
              <div className='overflow-hidden rounded mb-2 inline-block'>
                <Image
                  src={`/blog/thumbnail/${slug}.webp`}
                  alt={slug}
                  width={200}
                  height={200}
                  className={'h-auto w-auto object-cover aspect-square'}
                />
              </div>
              <div className='space-y-1 text-sm'>
                <h3 className='font-bold leading-none'>{title}</h3>
                <p className='text-xs text-muted-foreground'>{publishedAt}</p>
              </div>
            </div>
          </Link>
        );
      });
  };

  return renderArticleCards();
}
