import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { NEXT_PICKUP_DATE } from '@/constants/dates';
import Balancer from 'react-wrap-balancer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import HeroVideo from '@/components/heroVideo';
import FeaturedSection from './blog/featured_section';
import WhatsAppLink from '@/components/ui/whatsapp';
import PostHogEventCapture from '@/components/ui/posthogeventcapture';
import GoogleReviewCarousel from '@/components/googleReviewCarousel';
import PricingSection from '@/components/pricingsection';
import CollectionDateFeatureFlag from '@/components/collectiondatefeatureflag';

export default function Home() {
  return (
    <main>
      <div className='pt-8 lg:pt-16 pb-8 font-medium'>
        {/* HERO BANNER */}
        <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 lg:gap-8 px-6'>
          <HeroVideo />
          <div className='col-span-2 mt-8 lg:mt-16'>
            <h1 className='text-primary text-3xl md:text-4xl font-black'>
              <Balancer>Professional Knife Sharpening, Picked Up & Delivered</Balancer>
            </h1>
            <p className='mt-4 font-medium'>
              <Balancer>
                Our team has picked up and sharpened 100s of knives for home cooks and professional chefs.
              </Balancer>
            </p>
            <div className='mt-8 flex gap-4 flex-col lg:flex-row'>
              <WhatsAppLink origin='main'>
                <Button size={'xl'} className='flex flex-col gap-0 w-full lg:w-auto'>
                  <div className='text-lg font-black flex gap-1 items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='icon icon-tabler icon-tabler-brand-whatsapp h-5 w-5'
                      width='44'
                      height='44'
                      viewBox='0 0 24 24'
                      strokeWidth='2.5'
                      stroke='#FFFFFF'
                      fill='none'
                      strokeLinecap='round'
                      strokeLinejoin='round'>
                      <path stroke='none' d='M0 0h24v24H0z' />
                      <path d='M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9' />
                      <path d='M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1' />
                    </svg>
                    Sharpen Your Knives Now
                  </div>
                  <CollectionDateFeatureFlag type="main" />
                </Button>
              </WhatsAppLink>
              <a href='https://g.co/kgs/aXcTBcs' target='_blank' rel='noreferrer' className='block w-full lg:w-auto'>
                <Button
                  variant={'outline'}
                  size={'xl'}
                  className='text-lg font-black flex flex-col gap-0 w-full lg:w-auto'>
                  <div className='flex items-center gap-1'>
                    5.0
                    <div className='flex'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='#FAB130'
                        stroke='#FAB130'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='lucide lucide-star'>
                        <path d='M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z' />
                      </svg>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='#FAB130'
                        stroke='#FAB130'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='lucide lucide-star'>
                        <path d='M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z' />
                      </svg>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='#FAB130'
                        stroke='#FAB130'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='lucide lucide-star'>
                        <path d='M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z' />
                      </svg>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='#FAB130'
                        stroke='#FAB130'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='lucide lucide-star'>
                        <path d='M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z' />
                      </svg>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='#FAB130'
                        stroke='#FAB130'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='lucide lucide-star'>
                        <path d='M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z' />
                      </svg>
                    </div>
                  </div>
                  <p className='text-xs text-gray-500 font-medium underline'>Read our reviews</p>
                </Button>
              </a>
            </div>
          </div>
        </div>

        <PricingSection control={false} />
        {/* REVIEWS */}
        <GoogleReviewCarousel />
        {/* INSTRUCTIONS */}
        <div className='mt-16 bg-muted py-12'>
          <div className='max-w-6xl mx-auto px-6'>
            <h1 className='text-2xl md:text-3xl text-primary font-black mb-8 text-center'>A Simple 3-Step Process</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              <div className='col-span-1'>
                <Image src={'/images/step-1.png'} alt='Instructions' width={500} height={500} className='rounded-2xl' />
                <h2 className='text-xl text-primary font-black mt-4'>1. Pick Up</h2>
                <p>Leave your knives at your doorstep and we will swing by to collect it!</p>
                <WhatsAppLink origin='collection'>
                  <CollectionDateFeatureFlag type="badge" />
                </WhatsAppLink>
              </div>
              <div className='col-span-1'>
                <Image src={'/images/step-2.png'} alt='Instructions' width={500} height={500} className='rounded-2xl' />
                <h2 className='text-xl text-primary font-black mt-4'>2. Sharpen</h2>
                <p>
                  Our expert knifesmiths will restore your edges till it&apos;s razor sharp. That’s a Knife Sharpening
                  Singapore Guarantee!
                </p>
              </div>
              <div className='col-span-1'>
                <Image src={'/images/step-3.png'} alt='Instructions' width={500} height={500} className='rounded-2xl' />
                <h2 className='text-xl text-primary font-black mt-4'>3. Delivered</h2>
                <p>
                  We will drop them off within 24 hours at your doorstep, and you will be slicing and dicing with a
                  fresh edge again.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* PRICING */}
        <PricingSection control={true} />
        {/* CAROUSEL */}
        {/* <div className='mt-16 px-6'>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className='w-full'>
            <CarouselContent>
              {Array.from({ length: 8 }).map((_, index) => (
                <CarouselItem key={index} className='basis-1/3 lg:basis-1/6'>
                  <div className='p-1'>
                    <video autoPlay loop muted playsInline className='rounded-2xl'>
                      <source src={`/images/gallery/gallery-${index + 1}.mp4`} type='video/mp4' />
                    </video>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div> */}
        {/* CONTACT US */}
        <div className='max-w-6xl mx-auto mt-16 px-6'>
          <h1 className='text-3xl text-primary font-black text-center'>Contact Us</h1>
          <p className='mt-2 text-center'>
            <Balancer>
              We’re here to sharpen your knives! Reach out to us whenever to confirm your order or ask questions. We are
              available to answer 24/7 and will reply promptly.
            </Balancer>
          </p>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8'>
            <div className='col-span-1 bg-muted rounded-2xl p-8 md:p-12 text-center'>
              <h2 className='text-xl md:text-4xl text-primary font-black'>For Individuals</h2>
              <WhatsAppLink origin='contact'>
                <Button size={'lg'} className='text-lg font-black flex gap-2 w-full mt-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon icon-tabler icon-tabler-brand-whatsapp h-8 w-8'
                    width='44'
                    height='44'
                    viewBox='0 0 24 24'
                    strokeWidth='2.5'
                    stroke='#FFFFFF'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'>
                    <path stroke='none' d='M0 0h24v24H0z' />
                    <path d='M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9' />
                    <path d='M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1' />
                  </svg>
                  (65) 8068 4206
                </Button>
              </WhatsAppLink>
            </div>
            <div className='col-span-1 bg-muted rounded-2xl p-8 md:p-12 text-center'>
              <h2 className='text-xl md:text-4xl text-primary font-black'>For Restaurants</h2>
              <a href='mailto:hello@knifesharpening.sg'>
                <Button size={'lg'} className='md:text-lg font-black flex gap-2 w-full mt-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='lucide lucide-mail'>
                    <rect width='20' height='16' x='2' y='4' rx='2' />
                    <path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' />
                  </svg>
                  hello@knifesharpening.sg
                </Button>
              </a>
            </div>
          </div>
        </div>
        {/* FAQ */}
        <div className='max-w-6xl mx-auto mt-16 px-6 mb-16'>
          <h1 className='text-3xl text-primary font-black text-center'>Frequently Asked Questions</h1>
          <Accordion type='single' collapsible className='w-full mt-4 text-base'>
            <PostHogEventCapture name='faq' origin='how-to-sharpen'>
              <AccordionItem value='item-1'>
                <AccordionTrigger>How do we sharpen your knives?</AccordionTrigger>
                <AccordionContent>
                  <p>
                    We use a belt sharpener. Precision is our top priority – we take great care in ensuring the angle is
                    optimal. This approach ensures not only the sharpest edge but also minimizes the amount of metal
                    removed, prioritizing the longevity of your blades.
                  </p>
                  <br></br>
                  <p>
                    To guarantee optimal performance, we will test every knife on paper to ensure it slices
                    effortlessly. Your satisfaction and the functionality of your blades are of utmost importance to us.
                  </p>
                  <br></br>
                  <p>
                    If requested, we can use ultra fine diamond whetstones. You will be able to choose the angle.
                    Finishing and stropping will be up to 50,000 grit. However, there will be an additional charge of
                    $20/knife.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </PostHogEventCapture>
            <PostHogEventCapture name='faq' origin='why-sharpen'>
              <AccordionItem value='item-2'>
                <AccordionTrigger>Why should I sharpen my knives?</AccordionTrigger>
                <AccordionContent>
                  <ul className='list-disc pl-5'>
                    <li className='mb-4'>
                      <b>Enjoyable:</b> Cooking with dull knives is frustrating and time-consuming. Make cooking
                      pleasurable and faster with sharp knives.
                    </li>
                    <li className='mb-4'>
                      <b>Safer:</b> A dull knife is the main reason for knife-related incidents. Stay safe by keeping
                      your knives sharp.
                    </li>{' '}
                    <li className=''>
                      <b>Tastier:</b> Sharp knives will cause the smallest amount of damage and conserve the oils,
                      flavors and nutrients in your food.
                    </li>{' '}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </PostHogEventCapture>
            <PostHogEventCapture name='faq' origin='why-us'>
              <AccordionItem value='item-3'>
                <AccordionTrigger>Why choose Knife Sharpening Singapore?</AccordionTrigger>
                <AccordionContent>
                  <ul className='list-disc pl-5 mb-8'>
                    <li className='mb-4'>
                      <b>Convenience:</b> We make it easy for you. With door-to-door pick up and drop off, you can get
                      your knives sharpened without ever leaving your home.
                    </li>
                    <li className='mb-4'>
                      <b>Guaranteed Satisfaction:</b> We stand behind our work with confidence. If your knives aren’t
                      sharper than the day you bought them, we’ll make it right – no questions asked.
                    </li>{' '}
                    <li className=''>
                      <b>Expert Craftsmanship:</b> Our sharpening process is more than just a quick fix. We use
                      traditional techniques and the finest grit to ensure a razor-sharp edge with a flawless finish.
                    </li>{' '}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </PostHogEventCapture>
          </Accordion>
        </div>

        <FeaturedSection homepage />
      </div>
    </main>
  );
}
