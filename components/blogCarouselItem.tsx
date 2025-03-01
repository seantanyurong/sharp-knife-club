import Image from 'next/image';
import Link from 'next/link';

import { CarouselItem } from "@/components/ui/carousel"
import { getAllArticles } from '@/app/blog/utils';

export default async function BlogCarouselItem() {
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
        const { title, publishedAt, slug } = frontMatter;

        return (
            <CarouselItem key={slug} className="w-full sm:w-1/2 lg:w-1/3">
              <Link href={`/blog/${slug}`}>
              <div className="p-4 bg-white rounded-lg shadow-md">
                <Image
                  src={`/blog/thumbnail/${slug}.webp`}
                  alt={title}
                  width={400}
                  height={250}
                  className="rounded-md object-cover w-full h-48"
                />
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-gray-600">{publishedAt}</p>
              </div>
              </Link>
            </CarouselItem>
        );
      });
  };

  return renderArticleCards();
}
