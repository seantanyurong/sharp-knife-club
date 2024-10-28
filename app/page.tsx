import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <div className='bg-primary text-primary-foreground py-4 md:py-6 px-6'>
        <div className='max-w-6xl flex justify-between items-center mx-auto'>
          <Image src={'/logo.png'} alt='Sharp Knife Club' width={80} height={80} priority />
          <div className='flex gap-6'>
            <a href='https://wa.me/6580684206' className='items-center gap-1 hidden md:flex'>
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
              <p className='text-lg font-semibold'>(65) 8068 4206</p>
            </a>
            <a href='https://wa.me/6580684206'>
              <Button variant={'secondary'} size={'lg'} className='text-lg font-semibold hidden md:block'>
                Sharpen Knife
              </Button>
            </a>
            <a href='https://wa.me/6580684206'>
              <Button variant={'secondary'} size={'sm'} className='text-sm font-semibold block md:hidden'>
                Sharpen Knife
              </Button>
            </a>
          </div>
        </div>
      </div>
      <div className='relative hidden md:block'>
        <video autoPlay loop muted playsInline>
          <source src={'/images/hero.mp4'} type='video/mp4' />
        </video>
      </div>
      <div className='h-[65vh] block md:hidden'>
        <video autoPlay loop muted playsInline className='object-cover h-full'>
          <source src={'/images/hero.mp4'} type='video/mp4' />
        </video>
      </div>
      <div className='max-w-2xl mx-auto pt-16 pb-8 px-6'>
        <h1 className='text-5xl font-bold mb-8'>Hello!</h1>
        <p className='md:text-xl text-lg mb-8'>
          Our team has picked up and sharpened over 10,000 knives for home cooks and professional chefs. Let us help you
          next!
        </p>
        <div className='mb-16 bg-accent text-accent-foreground p-4 rounded-lg'>
          <h3 className='text-2xl font-bold'>How does it work?</h3>
          <br></br>
          <p className='md:text-xl text-lg mb-4'>It&apos;s a simple 3 step process.</p>
          <div className='hidden md:flex justify-between items-center'>
            <Image src={'/images/step-1.png'} alt='drop' width={190} height={190} priority className='rounded-lg' />
            <Image src={'/images/step-2.png'} alt='sharpen' width={190} height={190} priority className='rounded-lg' />
            <Image src={'/images/step-3.png'} alt='use' width={190} height={190} priority className='rounded-lg' />
          </div>
          <br></br>
          <ul className='md:text-xl text-lg list-decimal pl-5 mb-8'>
            <li className='mb-4'>
              <b>Pick up:</b> Choose a time for us to swing by and collect your knives.
            </li>
            <li className='mb-4'>
              <b>Sharpen:</b> Our expert knifesmiths will restore your edges and make them sharper than the day you
              bought them.
            </li>{' '}
            <li className=''>
              <b>Enjoy:</b> We will drop them off within 48 hours, and you will be slicing and dicing with a fresh edge
              again.
            </li>{' '}
          </ul>
          <a href='https://wa.me/6580684206'>
            <Button className='text-sm md:text-lg font-semibold w-full'>Sharpen Knife</Button>
          </a>
        </div>

        <h1 className='text-3xl font-bold mb-8'>How much do you charge?</h1>
        <div className='mb-8'>
          <p className='md:text-xl text-lg'>Prices are inclusive of door pick up and drop off fees.</p>
        </div>
        <div className='mb-16 bg-secondary text-secondary-foreground p-4 rounded-lg'>
          <h3 className='md:text-2xl text-lg font-bold mb-4'>
            1 Blade - $25 <span className='font-normal text-xl text-muted-foreground'>($25/knife)</span>
          </h3>
          <h3 className='md:text-2xl text-lg font-bold mb-4'>
            2 Blades - $30 <span className='font-normal text-xl text-muted-foreground'>($15/knife)</span>
          </h3>
          <h3 className='md:text-2xl text-lg font-bold'>
            3+ Blades - $10/knife (Best Deal){' '}
            {/* <span className='font-normal text-xl text-muted-foreground'>($10/knife)</span> */}
          </h3>
          {/* <h3 className='md:text-2xl text-lg font-bold mb-4'>
            4 Blades - $30 <span className='font-normal text-xl text-muted-foreground'>($30/knife)</span>
          </h3>
          <h3 className='md:text-2xl text-lg font-bold'>
            5+ Blades - $30 <span className='font-normal text-xl text-muted-foreground'>($30/knife)</span>
          </h3> */}
          {/* <p className='md:text-xl text-lg'>
            This is for your standard kitchen knife. Get it back as sharp as when you first bought it, guaranteed. It
            will glide through paper and slice meat effortlessly. <i>No serrated knives or scissors.</i>
          </p> */}
        </div>
        {/* <div className='mb-8 bg-secondary text-secondary-foreground p-4 rounded-lg'>
          <h3 className='md:text-xl text-lg font-bold'>Premium - $25 / knife*</h3>
          <br></br>
          <p className='md:text-xl text-lg'>
            This is for your high-end kitchen knives, japanese knives, etc. Our experts will sharpen it with the best
            treatment according to its individual material, design and anatomy.
          </p>
          <br></br>
          <p className='md:text-xl text-lg'>
            It will be hand sharpened with whetstones, up to 50,000 grit, and returned with a mirror finish.
          </p>
        </div> */}
        {/* <div className='mb-16'>
          <p className='md:text-xl text-lg'>*A minimum of 2 knives (basic / premium) are required.</p>
        </div> */}
        <h1 className='text-3xl font-bold mb-8'>How do we sharpen your knives?</h1>
        <div className='mb-16'>
          <p className='md:text-xl text-lg'>
            We use a Tormek belt sharpener. Precision is our top priority – we take great care in ensuring the angle is
            optimal. This approach ensures not only the sharpest edge but also minimizes the amount of metal removed,
            prioritizing the longevity of your blades.
          </p>
          <br></br>
          <p className='md:text-xl text-lg'>
            To guarantee optimal performance, we will test every knife on paper to ensure it slices effortlessly. Your
            satisfaction and the functionality of your blades are of utmost importance to us.
          </p>
          <br></br>
          <p className='md:text-xl text-lg'>
            If requested, we can use ultra fine diamond whetstones. You will be able to choose the angle. Finishing and
            stropping will be up to 50,000 grit. However, there will be an additional charge of $15/knife.
          </p>
        </div>
        <h1 className='text-3xl font-bold mb-8'>Why should I sharpen my knives?</h1>
        <div className='mb-16'>
          <ul className='md:text-xl text-lg list-disc pl-5'>
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
          <ul className='md:text-xl text-lg list-disc pl-5 mb-8'>
            <li className='mb-4'>
              <b>Convenience:</b> We make it easy for you. With door-to-door pick up and drop off, you can get your
              knives sharpened without ever leaving your home.
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
          <p className='md:text-xl text-lg'>
            Questions?{' '}
            <a
              href='https://wa.me/6580684206'
              className='underline text-blue-600 hover:text-blue-1 visited:text-purple-600'>
              Drop us a message.
            </a>
          </p>
        </div>
      </div>
      <footer>
        <div className='max-w-2xl mx-auto pb-16 px-6'>
          <p className='text-center text-sm text-gray-500 mb-1 font-bold'>Sharp Knife Club SG.</p>
          <p className='text-center text-sm text-gray-500 mb-1'>
            Pick-up knife sharpening service for more than 10,000 knives.
          </p>
          <p className='text-center text-sm text-gray-500'>&copy; 2024. All rights reserved.</p>
        </div>
      </footer>
      <a href='https://wa.me/6580684206'>
        <Button size={'lg'} className='text-lg font-semibold hidden md:block fixed bottom-6 right-6'>
          Sharpen Knife
        </Button>
      </a>
      <a href='https://wa.me/6580684206'>
        <Button size={'sm'} className='text-sm font-semibold block md:hidden fixed bottom-4 right-4'>
          Sharpen Knife
        </Button>
      </a>
    </main>
  );
}
