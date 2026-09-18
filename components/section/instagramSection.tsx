'use client';

import Image from 'next/image';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Instagram, Play } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

const INSTAGRAM_HANDLE = 'knifesharpening.sg';

type InstagramPost = {
  id: string;
  type: 'p' | 'reel';
  alt: string;
};

// Reels alternate with posts so the cutting tests don't bunch up.
// Images live in /public/images/instagram/<id>.webp
const POSTS: InstagramPost[] = [
  { id: 'DaiAUECzAfd', type: 'reel', alt: 'Blunt vs sharp knife: potato edition' },
  { id: 'DcLmllbEzRh', type: 'p', alt: 'What we sharpened this week' },
  { id: 'DZ98-SyzeG5', type: 'reel', alt: 'Blunt vs sharp knife: lemon edition' },
  { id: 'DZKcvHgE4xF', type: 'p', alt: 'Before vs after: a batch of chipped and dull knives' },
  { id: 'DZZ7ISyz_iR', type: 'reel', alt: 'Blunt vs sharp knife: tomato edition' },
  { id: 'DU3Kvh1Esij', type: 'p', alt: 'We strongly advise you not to sharpen your knife with us' },
  { id: 'DY15dQ5zgx8', type: 'reel', alt: 'Blunt vs sharp knife: grape edition' },
  { id: 'DYmfQ5bk4vs', type: 'p', alt: 'Before vs after: our first knife repair' },
  { id: 'DWRIkI8kxp7', type: 'reel', alt: 'Cucumber vs blunt knife, sharp knife and bare hands' },
];

export default function InstagramSection() {
  const autoplayPlugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-primary font-black text-center">
          OVER 3000 SINGAPOREAN KNIVES SHARPENED...
        </h2>

        <Carousel
          // Mobile: one centred tile with the neighbours peeking in at both edges
          opts={{ align: 'center', loop: true, breakpoints: { '(min-width: 640px)': { align: 'start' } } }}
          plugins={[autoplayPlugin.current]}
          onMouseEnter={autoplayPlugin.current.stop}
          onMouseLeave={autoplayPlugin.current.reset}
          className="mt-8 -mx-6 sm:mx-0"
        >
          <CarouselContent>
            {POSTS.map((post) => (
              <CarouselItem key={post.id} className="basis-[70%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <a
                  href={`https://www.instagram.com/${INSTAGRAM_HANDLE}/${post.type}/${post.id}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-[3/4] overflow-hidden rounded-md shadow-lg"
                >
                  <Image
                    src={`/images/instagram/${post.id}.webp`}
                    alt={post.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 70vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {post.type === 'reel' && (
                    <Play
                      className="absolute right-3 top-3 h-5 w-5 fill-white text-white drop-shadow"
                      aria-hidden
                    />
                  )}
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-8 flex justify-center">
          <a
            href={`https://www.instagram.com/${INSTAGRAM_HANDLE}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-bold text-stone-900 hover:text-amber-600"
          >
            <Instagram className="h-5 w-5" aria-hidden />@{INSTAGRAM_HANDLE}
          </a>
        </div>
      </div>
    </section>
  );
}
