import * as React from 'react';
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { NEXT_PICKUP_DATE } from '@/constants/dates';
import Balancer from 'react-wrap-balancer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import WhatsAppLink from '@/components/ui/whatsapp';
import PostHogEventCapture from '@/components/ui/posthogeventcapture';
import GoogleReviewCarousel from '@/components/googleReviewCarousel';
import PricingSection from '@/components/pricingsection';
import CollectionDateFeatureFlag from '@/components/collectiondatefeatureflag';
import GoogleReviewButton from '@/components/googleReviewButton';
import LogoSection from '@/components/logosection';
import FeaturedSection from './blog/featured_section';
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export default function Home() {
  return (
    <main>
      <div className='pb-8 font-medium bg-muted'>
        {/* HERO BANNER */}
        <div className='bg-[url(/images/hero-bg.png)] bg-cover py-20 lg:py-40'>
          <div className='max-w-6xl mx-auto grid grid-cols-1 lg:gap-8 px-6 text-center justify-center '>
            <h1 className='text-primary-foreground text-2xl md:text-6xl font-black'>
              <Balancer>KNIFE SHARPENING IN ONE DAY - PICKUP & DELIVERY INCLUDED</Balancer>
            </h1>
            <div className='mt-8 flex gap-4 flex-col lg:flex-row justify-center'>
              <WhatsAppLink origin='main'>
                <Button variant={'secondary'} size={'2xl'} className='flex flex-col gap-0 w-full lg:w-auto'>
                  <div className='text-xl font-black flex gap-1 items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      x='0px'
                      y='0px'
                      width='100'
                      height='100'
                      viewBox='0 0 48 48'
                      className='!w-6 !h-6'>
                      <path
                        fill='#fff'
                        d='M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z'></path>
                      <path
                        fill='#fff'
                        d='M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z'></path>
                      <path
                        fill='#40c351'
                        d='M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z'></path>
                      <path
                        fill='#fff'
                        fillRule='evenodd'
                        d='M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z'
                        clipRule='evenodd'></path>
                    </svg>
                    BOOK KNIFE PICKUP
                  </div>
                  <CollectionDateFeatureFlag type='main' />
                </Button>
              </WhatsAppLink>
              <GoogleReviewButton />
            </div>
          </div>
          {/* REVIEWS */}
          <GoogleReviewCarousel />
        </div>
        {/* INSTRUCTIONS */}
        <div className='pt-16 bg-muted py-12'>
          <div className='max-w-6xl mx-auto px-6'>
            <h1 className='text-2xl md:text-3xl text-primary font-black mb-8 text-center'>FREE PICKUP ISLANDWIDE | DELIVERED WITHIN ONE DAY</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              <div className='col-span-1'>
                <Image src={'/images/step-1.png'} alt='Instructions' width={500} height={500} className='rounded-2xl' />
                <h2 className='text-xl text-primary font-black mt-4'>1. Pick Up</h2>
                <p>Leave your knives at your doorstep and we will swing by to collect it!</p>
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
            <WhatsAppLink origin='contact'>
              <Button size={'xl'} variant={'secondary'} className='text-xl font-black flex gap-2 mt-8 mx-auto'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  x='0px'
                  y='0px'
                  width='100'
                  height='100'
                  viewBox='0 0 48 48'
                  className='!w-6 !h-6'>
                  <path
                    fill='#fff'
                    d='M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z'></path>
                  <path
                    fill='#fff'
                    d='M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z'></path>
                  <path
                    fill='#40c351'
                    d='M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z'></path>
                  <path
                    fill='#fff'
                    fillRule='evenodd'
                    d='M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z'
                    clipRule='evenodd'></path>
                </svg>
                Book Knife Pickup: {NEXT_PICKUP_DATE}
              </Button>
            </WhatsAppLink>
          </div>
        </div>
        {/* PRICING */}
        <PricingSection />
        <LogoSection />
        {/* CONTACT US */}
        <div className='bg-[url(/images/contact-bg.png)] bg-cover py-16 px-6'>
          <div className='max-w-6xl mx-auto'>
            <h1 className='text-5xl text-primary-foreground font-black text-center'>CONTACT US</h1>
            <p className='mt-4 text-center text-primary-foreground'>
              <Balancer>
                We are available to answer 24/7 and will reply in &lt;10 minutes most of the time.
              </Balancer>
            </p>
            <div className='max-w-xl grid grid-cols-1 gap-2 mt-4 mx-auto'>
              <WhatsAppLink origin='contact'>
                <Button size={'xl'} variant={'secondary'} className='text-xl font-black flex gap-2 w-full mt-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    x='0px'
                    y='0px'
                    width='100'
                    height='100'
                    viewBox='0 0 48 48'
                    className='!w-6 !h-6'>
                    <path
                      fill='#fff'
                      d='M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z'></path>
                    <path
                      fill='#fff'
                      d='M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z'></path>
                    <path
                      fill='#40c351'
                      d='M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z'></path>
                    <path
                      fill='#fff'
                      fillRule='evenodd'
                      d='M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z'
                      clipRule='evenodd'></path>
                  </svg>
                  (65) 8068 4206
                </Button>
              </WhatsAppLink>
              <a href='mailto:hello@knifesharpening.sg'>
                <Button size={'xl'} variant={'muted'} className='text-xl font-black flex gap-2 w-full mt-4'>
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
        {/* SINGLE REVIEW */}
        <div className='bg-white py-16 px-6'>
          <div className='max-w-3xl mx-auto text-center'>
            <div className='flex space-x-1 mx-auto justify-center'>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className='w-8 h-8 text-secondary fill-secondary' />
              ))}
            </div>
            <p className='mt-6 text-xl'><Balancer>“Extremely efficient with pick up and drop off. Great communication and also loved how sharp the knives were after! 100% recommend.”</Balancer></p>
            <div className='flex justify-center gap-4 items-center mt-6'>
              <Avatar>
                <AvatarImage src="/images/karmen.png" />
              </Avatar>
              <div className='text-left'>
                <p className='font-bold'>Karmen Tang | @tangkarmen on IG</p>
                <p className='font-normal text-sm'>A Food & Wellness Influencer with 13.7k Followers</p>
              </div>
            </div>
          </div>
        </div>
        {/* FAQ */}
        <div className='bg-muted py-16 px-6'>
          <div className='max-w-6xl mx-auto'>
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
        </div>

        <FeaturedSection homepage />
      </div>
    </main >
  );
}
