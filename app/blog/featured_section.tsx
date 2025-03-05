import Image from 'next/image'

function FeaturedSection({ homepage=false } : { homepage?: boolean }) {
  const featuredArticleSlug = "the-ultimate-guide-to-knife-sharpening-everything-you-need-to-know"

  return (
    <section className="w-full bg-[#fcf3e3] py-12 mt-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <Image 
            src={`/blog/thumbnail/${featuredArticleSlug}.webp`}
            alt="Featured Article" 
            width={600} 
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
        {homepage
        ?
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl text-primary font-black text-[#faaf2e]">The Ultimate Guide to Knife Sharpening</h2>
          <p className="mt-4 text-black">Discover why professional sharpening extends your knife&apos;s lifespan and enhances your cooking experience.</p>
          <a href={`/blog/${featuredArticleSlug}`} className="mt-6 inline-block bg-[#faaf2e] text-md font-black text-white py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600 transition">Read More</a>
        </div>
        :
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-2xl text-black font-bold">The Ultimate Guide to Knife Sharpening</h2>
          <p className="mt-4 text-gray-600">Discover why professional sharpening extends your knife&apos;s lifespan and enhances your cooking experience.</p>
          <a href={`/blog/${featuredArticleSlug}`} className="mt-6 inline-block bg-[#faaf2e] text-md font-black text-white py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600 transition">Read More</a>
        </div>
        }

      </div>
    </section>
  )
}

export default FeaturedSection