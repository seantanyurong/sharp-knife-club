'use client';

import * as React from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import GoogleReview from '@/components/googleReview';
import { googleReviews } from '@/constants/google_reviews';

export default function GoogleReviewCarousel() {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div className='max-w-6xl mx-auto mt-8 lg:mt-16 px-6'>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className='w-full'>
        <CarouselContent>
          {googleReviews.filter(item => item.comment).map((review, index) => (
            <CarouselItem key={index} className='sm:basis-1/2 md:basis-1/3 lg:basis-1/4'>
              <div className='p-1'>
                <GoogleReview profile={review.src} name={review.user} rating={review.rating} comment={review.comment} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
