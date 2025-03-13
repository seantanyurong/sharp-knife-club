'use client';

import * as React from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import GoogleReview from '@/components/googleReview';

const googleReviews = [
  {
    name: 'Paul Martin',
    rating: 5,
    comment:
      'Excellent service. Great communication throughout with recommendations based on the actual knife condition. Returned as promised within 24 hours, even on a weekend. The knives are in superb condition now. Much appreciated. Will definitely use them again. Highly recommended.',
  },
  {
    name: 'Oz S Perry',
    rating: 5,
    comment:
      'Great service fast and reliable. The workmanship was good and the knives were really sharp. Will use the service again.',
  },
  {
    name: 'Bernard Raj',
    rating: 5,
    comment:
      'I recently sent my knives for sharpening, and I couldn’t be happier with the results. The edges are razor-sharp, better than when they were brand new! The service was efficient, professional, and truly exceeded my expectations.',
  },
  {
    name: 'Ann Williams',
    rating: 5,
    comment: 'Very prompt, friendly service! My set of knives came back very nicely sharpened the very next day.',
  },
  {
    name: 'Z K',
    rating: 5,
    comment:
      'The service is excellent. All you need to do is just to leave the knives at your doorstep in the morning and they will all be back in original sharpness in the morning next day. So convenient, pick up and delivery are FOC, and they only charge $15 per knife!',
  },
  {
    name: 'Hong Lynn Chen',
    rating: 5,
    comment:
      'Randomly googled as my knives were in dire need of sharpening. Knife Sharpening SG came up and - zero regrets! They pick up and return within 24 hours but I needed them to delay return by a day and they were happy to do that, my knives are super sharp now.',
  },
  {
    name: 'Jonas Tan',
    rating: 5,
    comment:
      'Sent in 5 knives for sharpening and couldn’t be happier with the results! All the knives were returned razor-sharp, making cooking a breeze again. The pick-up and delivery service straight to my doorstep also made the whole process super convenient. Highly recommend!',
  },
  {
    name: 'Jonathan Jerome',
    rating: 5,
    comment:
      'Great experience overall. Very satisfied with the end result and the expedient pick up and drop off was a pleasant surprise. Will definitely be using this service in the future.',
  },
  {
    name: 'Benedict Lee',
    rating: 5,
    comment: 'The knives that you have sharpened are wonderfully sharpened. A job well done!',
  },
  {
    name: 'Alessandro Felicani',
    rating: 5,
    comment:
      'Great 24hr service with home pick up and delivery. Sharpened as expected with fast and smooth communication! I might try the service for my Japanese knives and fixing some chipped ones in the future!',
  },
  {
    name: 'Alexander Sim',
    rating: 5,
    comment:
      'Highly professional - punctual pick up from home (at no additional cost) and delivery (at no additional cost too). Knives are as sharp as samurai swords now!',
  },
  {
    name: 'Joseph Ong',
    rating: 5,
    comment:
      'I had to sharpen a knife urgently to cook for a family gathering - and they were able to do it quite quickly. Within a few days of handing over my knife, I got it back sharpened. Quite affordable too for a pick-up service. Will use again.',
  },
  {
    name: 'Y A',
    rating: 5,
    comment:
      'Incredibly efficient pick up and re-delivery of knives. Great pricing and most importantly, the knives were sharpened really well. Thank you!',
  },
  {
    name: 'Raymond KONG',
    rating: 5,
    comment:
      'SKC Service was especially suitable for those with a busy schedule. Knife was razor sharp after the process. Overall experience was good!',
  },
  {
    name: 'Bckt',
    rating: 5,
    comment: 'Quick and easy service. Knives nicely sharpened. Great service.',
  },
  {
    name: 'Pu Xiaorong',
    rating: 5,
    comment: 'Impressed with the service, direct pick up from home and return following day, good customer service.',
  },
  {
    name: 'Ataru Onuma',
    rating: 5,
    comment: 'Quick high-quality service. And good price.',
  },
  {
    name: 'Lalitha G',
    rating: 5,
    comment: 'Awesome service. Prompt and Professional.',
  },
  {
    name: 'C Phang',
    rating: 5,
    comment: 'Good service with fast turnaround.',
  },
];

export default function GoogleReviewCarousel() {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div className='max-w-6xl mx-auto mt-16 px-6'>
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
          {googleReviews.map((review, index) => (
            <CarouselItem key={index} className='sm:basis-1/2 md:basis-1/3 lg:basis-1/4'>
              <div className='p-1'>
                <GoogleReview name={review.name} rating={review.rating} comment={review.comment} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
