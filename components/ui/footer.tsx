import Link from "next/link";

function Footer() {
  return (
    <footer>
      <div className='max-w-2xl mx-auto pb-16 px-6'>
      <Link href='/blog'>
        <p className='text-center text-sm text-gray-500 mb-1 italic'>Blog</p>
      </Link>
      <p className='text-center text-sm text-gray-500 mb-1 font-bold'>Knife Sharpening Singapore.</p>
      <p className='text-center text-sm text-gray-500 mb-1'>
        Professional knife sharpening, picked up & delivered.
      </p>
      <p className='text-center text-sm text-gray-500'>&copy; 2024. All rights reserved.</p>
      </div>
    </footer>  
  )
}

export default Footer