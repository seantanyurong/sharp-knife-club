import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import PostHogEventCapture from "../ui/posthogeventcapture"

export default function FaqSection() {
  return (
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
  )
}
