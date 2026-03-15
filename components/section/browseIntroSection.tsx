import type { BrowsePageConfig } from '@/constants/browse-pages';

type BrowseIntroProps = Omit<BrowsePageConfig['intro'], 'faqs'>;

export default function BrowseIntroSection({ heading, body, bullets, whyItMatters, ourProcess }: BrowseIntroProps) {
  return (
    <div className='bg-white py-16 px-6'>
      <div className='max-w-6xl mx-auto'>

        {/* Heading + body */}
        <h2 className='text-2xl md:text-3xl font-black text-primary mb-3'>{heading}</h2>
        <p className='text-gray-500 mb-8'>{body}</p>

        {/* Pill grid */}
        <ul className='flex flex-wrap gap-2 mb-12'>
          {bullets.map((b) => (
            <li key={b} className='flex items-center gap-1.5 bg-muted rounded-full px-4 py-2 text-sm font-semibold text-primary'>
              <span className='text-secondary'>✓</span> {b}
            </li>
          ))}
        </ul>

        {/* Why + Process — two column cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='bg-muted rounded-xl p-6 border-l-4 border-primary'>
            <h3 className='font-black text-primary text-lg mb-3'>{whyItMatters.heading}</h3>
            {whyItMatters.paragraphs.map((p, i) => (
              <p key={i} className='text-gray-600 text-sm leading-relaxed mb-2 last:mb-0'>{p}</p>
            ))}
          </div>
          <div className='bg-muted rounded-xl p-6 border-l-4 border-secondary'>
            <h3 className='font-black text-primary text-lg mb-3'>{ourProcess.heading}</h3>
            {ourProcess.paragraphs.map((p, i) => (
              <p key={i} className='text-gray-600 text-sm leading-relaxed mb-2 last:mb-0'>{p}</p>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
