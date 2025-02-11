import ArticleCards from './article_cards'

function page() {
    return (
        <>    
          <div className='max-w-3xl mx-auto p-6'>
            <h1 className='text-3xl mt-6 font-semibold text-center'>Blog</h1>

            <section className='relative'>
              <div className='py-8 md:py-12'>
                <div className='relative max-w-7xl mx-auto px-4 sm:px-6'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12'>{<ArticleCards />}</div>
                </div>
              </div>
            </section>
          </div>
        </>
  )
}

export default page