'use client';

import * as React from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import GoogleReview from '@/components/googleReview';

const googleReviews = [
  {
    name: 'Ken Chang',
    rating: 5,
    comment:
      'Excellent service. Sean did a great job sharpening my Japanese knives and a chinese chopper. Tested them with the newspaper cutting test and passed beautifully. Prompt pick up and turnaround too! Would recommend their service for anyone looking to sharpen their knives.',
  },
  {
    name: 'Z K',
    rating: 5,
    comment:
      'The service is excellent. All you need to do is just to leave the knives at your doorstep in the morning and they will all be back in original sharpness in the morning next day. So convenient, pick up and delivery are FOC, and they only charge $15 per knife!',
  },
  {
    name: 'JC - Local Guide',
    rating: 5,
    comment:
      'Massive kudos to Sean and the Knife Sharpening SG crew! ⚡🔪 Fast, friendly, and freakishly convenient — pick-up and drop-off included in the price (yes, really!) 🚚💸 Sean’s super responsive and just an all-round awesome guy 🙌 My knives came back scary sharp — in the best way. They’re sharper than my jokes now! 😅🔥',
  },
  {
    name: 'Bernard Raj',
    rating: 5,
    comment:
      'I recently sent my knives for sharpening, and I couldn’t be happier with the results. The edges are razor-sharp, better than when they were brand new! The service was efficient, professional, and truly exceeded my expectations.',
  },
  {
    name: 'Eugene Chang',
    rating: 5,
    comment: 'If you’re looking for a place to sharpen those knives of yours, look no further than this! Excellent and top notch service. He will pickup and deliver back to you with no worries. Love the quality of the finishing of my kitchen knives. Thank you very much Sean.',
  },
  {
    name: 'Hong Lynn Chen',
    rating: 5,
    comment:
      'Randomly googled as my knives were in dire need of sharpening. Knife Sharpening SG came up and - zero regrets! They pick up and return within 24 hours but I needed them to delay return by a day and they were happy to do that, my knives are super sharp now.',
  },
  {
    name: 'Paul Martin',
    rating: 5,
    comment:
      'Excellent service. Great communication throughout with recommendations based on the actual knife condition. Returned as promised within 24 hours, even on a weekend. The knives are in superb condition now. Much appreciated. Will definitely use them again. Highly recommended.',
  },
  {
    name: 'Doreen Leong',
    rating: 5,
    comment:
      'Extremely satisfied with the exceptional service from Knife Sharpening Singapore! The seamless process included prompt 24-hour pickup and return, with knives carefully wrapped and protected. The pricing was reasonable, and the sharpening work was impeccable. Thank you for a job well done!',
  },
  {
    name: 'Jonathan Jerome',
    rating: 5,
    comment:
      'Great experience overall. Very satisfied with the end result and the expedient pick up and drop off was a pleasant surprise. Will definitely be using this service in the future.',
  },
  {
    name: 'Andrew Deane',
    rating: 5,
    comment: 'Exceptional Knife Sharpening Service – Like Factory New! I recently entrusted this company with 11 of my cherished Global knives, and I couldn’t be more impressed with the results. These knives are the heart of my kitchen and see heavy daily use, so I was a bit nervous handing them over. But wow—when they were returned, they looked and felt almost like they had just come out of the factory!',
  },
  {
    name: 'Alessandro Felicani',
    rating: 5,
    comment:
      'Great 24hr service with home pick up and delivery. Sharpened as expected with fast and smooth communication! I might try the service for my Japanese knives and fixing some chipped ones in the future!',
  },
];

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
