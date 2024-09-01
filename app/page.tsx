import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <div className='bg-primary text-primary-foreground py-4 md:py-8 px-4'>
        <div className='max-w-6xl flex justify-between items-center mx-auto'>
          <h1 className='text-lg md:text-3xl font-semibold'>Sharp Knife Club</h1>
          <div className='flex gap-6'>
            <a href='https://wa.me/6596770773' className='items-center gap-1 hidden md:flex'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-brand-whatsapp text-primary-foreground h-8 w-8'
                width='44'
                height='44'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='#f8fafc'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9' />
                <path d='M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1' />
              </svg>
              <p className='text-lg font-semibold'>(65) 9677 0773</p>
            </a>
            <Button variant={'secondary'} size={'lg'} className='text-lg font-semibold hidden md:block'>
              Join Waitlist
            </Button>
            <Button variant={'secondary'} size={'sm'} className='text-sm font-semibold block md:hidden'>
              Join Waitlist
            </Button>
          </div>
        </div>
      </div>
      <div className='h-[65vh] w-screen relative'>
        <Image src={'/images/hero.jpg'} alt='Sharp Knife Club' fill objectFit='cover' priority />
      </div>
      <div className='max-w-2xl mx-auto py-16 px-4'>
        <h1 className='text-5xl font-bold mb-8'>Hello!</h1>
        <p className='text-xl mb-8'>
          We help pick up and sharpen knives for over 500 home cooks and professional chefs. Let us help you next!
        </p>
        <div className='mb-16 bg-accent text-accent-foreground p-4 rounded-lg'>
          <h3 className='text-2xl font-bold'>How does it work?</h3>
          <br></br>
          <p className='text-xl'>It&apos;s a simple 3 step process.</p>
          <br></br>
          <ul className='text-xl list-disc pl-5'>
            <li className='mb-4'>
              <b>Drop Off:</b> Leave your knives at one of our many locations across Singapore.
            </li>
            <li className='mb-4'>
              <b>Sharpen:</b> Our expert knifesmiths skillfully restore those edges and make them sharper than the day
              you bought them.
            </li>{' '}
            <li className=''>
              <b>Enjoy:</b> In about a week, you will be slicing and dicing with a fresh edge again.
            </li>{' '}
          </ul>
        </div>

        <h1 className='text-3xl font-bold mb-8'>How much do you charge?</h1>
        <div className='mb-8'>
          <p className='text-xl'>
            Prices are inclusive of pick up and drop off fees. A minimum of 3 knives are required.
          </p>
        </div>
        <div className='mb-8 bg-secondary text-secondary-foreground p-4 rounded-lg'>
          <h3 className='text-xl font-bold mb-4'>Basic - $10 / knife</h3>
          <p className='text-xl'>
            This is for your standard kitchen knife. Get it back as sharp as when you first bought it, guaranteed. It
            will glide through paper and slice meat effortlessly. <i>No serrated knives or scissors.</i>
          </p>
        </div>
        <div className='mb-16 bg-secondary text-secondary-foreground p-4 rounded-lg'>
          <h3 className='text-xl font-bold'>Premium - $25 / knife</h3>
          <br></br>
          <p className='text-xl'>
            This is for your high-end kitchen knives, japanese knives, etc. Our experts will sharpen it with the best
            treatment according to its individual material, design and anatomy.
          </p>
          <br></br>
          <p className='text-xl'>
            It will be hand sharpened with whetstones, up to 50,000 grit, and returned with a mirror finish.
          </p>
        </div>
        <h1 className='text-3xl font-bold mb-8'>Why should I sharpen my knives?</h1>
        <div className='mb-16'>
          <ul className='text-xl list-disc pl-5'>
            <li className='mb-4'>
              <b>Enjoyable:</b> Cooking with dull knives is frustrating and time-consuming. Make cooking pleasurable and
              faster with sharp knives.
            </li>
            <li className='mb-4'>
              <b>Safer:</b> A dull knife is the main reason for knife-related incidents. Stay safe by keeping your
              knives sharp.
            </li>{' '}
            <li className=''>
              <b>Tastier:</b> Sharp knives will cause the smallest amount of damage and conserve the oils, flavors and
              nutrients in your food.
            </li>{' '}
          </ul>
        </div>
        <h1 className='text-3xl font-bold mb-8'>Why choose Sharp Knife Club?</h1>
        <div className='mb-16'>
          <ul className='text-xl list-disc pl-5 mb-8'>
            <li className='mb-4'>
              <b>Convenience:</b> We make it easy for you. With multiple drop-off points across Singapore, you can
              conveniently leave your knives with us, and we’ll take care of the rest. No need to worry about making
              time in your busy schedule.
            </li>
            <li className='mb-4'>
              <b>Guaranteed Satisfaction:</b> We stand behind our work with confidence. If your knives aren’t sharper
              than the day you bought them, we’ll make it right – no questions asked.
            </li>{' '}
            <li className=''>
              <b>Expert Craftsmanship:</b> Our sharpening process is more than just a quick fix. We use traditional
              techniques and the finest grit to ensure a razor-sharp edge with a flawless finish.
            </li>{' '}
          </ul>
          <p className='text-xl'>
            Questions?{' '}
            <a
              href='https://wa.me/6596770773'
              className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600'>
              Drop us a message.
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
