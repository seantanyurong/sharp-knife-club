import Link from 'next/link';

/**
 * Site-wide promo banner pointing to the chopping board page.
 * Rendered in app/(main)/layout.tsx above the header.
 */
export default function BoardBanner() {
  return (
    <div className='bg-secondary text-secondary-foreground'>
      <Link
        href='/chopping-board'
        className='mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-sm font-bold transition-opacity hover:opacity-90 sm:text-base'
      >
        <span className='rounded bg-black px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-secondary sm:text-xs'>
          New
        </span>
        <span>Handcrafted End-Grain Boards — rescued Singapore wood · Join the waitlist →</span>
      </Link>
    </div>
  );
}
