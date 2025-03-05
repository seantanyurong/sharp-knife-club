import Image from 'next/image'
import ArticleCards from './article_cards'
import FeaturedSection from './featured_section'

function page() {
  const featuredArticleSlug = "the-ultimate-guide-to-knife-sharpening-everything-you-need-to-know"

  return (
    <>
      <div className='max-w-3xl mx-auto p-6'>
        <h1 className='text-3xl mt-6 font-bold text-center'>Blog</h1>

        <FeaturedSection />

        <section className='relative'>
          <div className='py-8 md:py-12'>
            <div className='relative max-w-7xl mx-auto px-4 sm:px-6'>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12'>{<ArticleCards currentArticle={featuredArticleSlug} />}</div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default page