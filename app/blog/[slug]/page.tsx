import Article from './article';
// import TableOfContentsSidebar from './sidebar';
import { getArticle } from '../utils';
import { NEXT_PICKUP_DATE } from '@/constants/dates';
import ArticleCards from '../article_cards';

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const articleInfo = getArticle(slug);
  const { frontMatter: metadata, markdownContent: article } = articleInfo;

  if (!article) {
    return <div>No article found.</div>;
  }

  return (
    <>
      {/* <TableOfContentsSidebar markdown={article} /> */}

      <div className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-semibold mb-4">{metadata.title}</h1>
        <p className="text-sm text-gray-500 mb-8">{metadata.publishedAt}</p>

        <Article text={article} />

        <p className='text-sm text-gray-500 mb-8'>
          <i>
            We are currently only operating in Singapore. Our next pick up will be on {`${NEXT_PICKUP_DATE}`}.
          </i>
        </p>

        <section className="relative">
          <div className="py-8 md:py-12">
            <h2 className="text-2xl font-semibold mb-4">More Articles</h2>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
                <ArticleCards currentArticle={slug} random limit={3} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
