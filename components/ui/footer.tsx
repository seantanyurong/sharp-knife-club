import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../public/logo.png';
import { SHARPEN_PAGES, ADDON_PAGES } from '@/constants/browse-pages';
import PostHogEventCapture from '@/components/ui/posthogeventcapture';

const GUIDE_SLUG =
  'the-ultimate-guide-to-knife-sharpening-everything-you-need-to-know';

const COMPANY_LINKS = [
  { href: '/use-cases', label: 'Use Cases' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
];

const headingClass =
  'text-xs font-black tracking-[0.2em] text-primary-foreground';
const linkClass =
  'text-sm text-primary-foreground/60 transition-colors hover:text-secondary';

function Footer() {
  const year = new Date().getFullYear();

  return (
    // Extra bottom padding clears the fixed StickyCta bar.
    <footer className='bg-primary text-primary-foreground'>
      <div className='max-w-7xl mx-auto px-6 pt-16 pb-[calc(env(safe-area-inset-bottom)+13rem)] md:pb-32'>
        <div className='grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12'>
          <div className='col-span-2 md:col-span-1'>
            <Image src={Logo} alt='Knife Sharpening Singapore' width={180} height={130} />
            <p className='mt-4 text-sm text-primary-foreground/60'>
              Professional knife sharpening. Free pickup and delivery
              islandwide, returned within 24 hours.
            </p>
            <a
              href='https://wa.me/6580684206?text=Hello%21%20Can%20you%20share%20more%20information%3F'
              target='_blank'
              rel='noreferrer'
              className='mt-4 inline-block text-sm font-bold text-secondary hover:text-secondary/80'
            >
              (65) 8068 4206
            </a>
            <a
              href='mailto:hello@knifesharpening.sg'
              className='mt-1 block text-sm text-primary-foreground/60 hover:text-secondary'
            >
              hello@knifesharpening.sg
            </a>
          </div>

          <div>
            <h3 className={headingClass}>WHAT WE SHARPEN</h3>
            <ul className='mt-4 flex flex-col gap-2'>
              {Object.entries(SHARPEN_PAGES).map(([slug, page]) => (
                <li key={slug}>
                  <Link href={`/sharpen/${slug}`} className={linkClass}>
                    {page.tile.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={headingClass}>ADD-ON SERVICES</h3>
            <ul className='mt-4 flex flex-col gap-2'>
              {Object.entries(ADDON_PAGES).map(([slug, page]) => (
                <li key={slug}>
                  <Link href={`/add-on/${slug}`} className={linkClass}>
                    {page.tile.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={headingClass}>COMPANY</h3>
            <ul className='mt-4 flex flex-col gap-2'>
              <li>
                <Link href={`/blog/${GUIDE_SLUG}`} className={linkClass}>
                  <PostHogEventCapture name='ultimate-guide' origin='footer'>
                    The Ultimate Guide to Knife Sharpening
                  </PostHogEventCapture>
                </Link>
              </li>
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href='/terms-and-conditions.pdf'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={linkClass}
                >
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-12 flex flex-col gap-1 border-t border-white/10 pt-6 text-xs text-primary-foreground/40 md:flex-row md:justify-between'>
          <p>Knife Sharpening Singapore Pte. Ltd</p>
          <p>&copy; {year}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
