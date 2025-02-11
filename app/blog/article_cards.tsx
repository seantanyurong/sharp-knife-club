import Image from 'next/image';
import Link from 'next/link';

import { getAllArticles } from './utils';

export default async function ArticleCards({ currentArticle, random=false, limit=0 } : { currentArticle?: string; random?: boolean; limit?: number }) {
    const articles = getAllArticles()

  const renderArticleCards = () => {
    if (!articles) {
      return <p>No events found.</p>;
    }

    return articles
      .filter(article => {
        return article.frontMatter.slug != currentArticle;
      })
      .sort(function (a, b) {
        if (!random) {
          return new Date(b.frontMatter.publishedAt).getTime() - new Date(a.frontMatter.publishedAt).getTime();
        }
        return 0.5 - Math.random();
      })
      .slice(0, limit === 0 ? articles.length : limit)
      .map((article) => {
        const { frontMatter } = article;
        const { title, publishedAt, slug } = frontMatter;

        return (
          <Link
            href={`/blog/${slug}`}
            key={slug}
            className="block w-full max-w-xs mx-auto"
          >
            <div className="overflow-hidden rounded mb-2">
              <Image
                src={`/blog/thumbnail/${slug}.webp`}
                alt={slug}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
            <div className="space-y-1 text-sm">
              <h3 className="font-bold leading-small text-base">{title}</h3>
              <p className="text-xs text-muted-foreground">{publishedAt}</p>
            </div>
          </Link>
        );
      });
  };

  return renderArticleCards();
}
