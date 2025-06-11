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
          Professional knife sharpening, free pickup islandwide.
        </p>
        <p className='text-center text-sm text-gray-500 mb-1'>&copy; 2024. All rights reserved.</p>
        <div className='text-center mt-4'>
          <a href='/terms-and-conditions.pdf' target='_blank' rel='noopener noreferrer' className='text-sm text-blue-500 hover:underline'>
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;