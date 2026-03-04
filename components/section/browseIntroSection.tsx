import type { BrowsePageConfig } from '@/constants/browse-pages';

type BrowseIntroProps = Omit<BrowsePageConfig['intro'], 'faqs'>;

export default function BrowseIntroSection({ heading, body, bullets, whyItMatters, ourProcess }: BrowseIntroProps) {
  return (
    <div className='bg-white py-12 px-6'>
      <div className='max-w-6xl mx-auto space-y-12'>

        {/* Intro */}
        <div>
          <h2 className='text-2xl md:text-3xl font-black text-primary mb-4'>{heading}</h2>
          <p className='text-base text-gray-700 mb-6 max-w-2xl'>{body}</p>
          <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3'>
            {bullets.map((b) => (
              <li key={b} className='bg-muted rounded-md px-4 py-3 text-sm font-medium text-primary text-center'>
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Why it matters */}
        <div>
          <h2 className='text-xl md:text-2xl font-black text-primary mb-4'>{whyItMatters.heading}</h2>
          <div className='space-y-4 max-w-2xl'>
            {whyItMatters.paragraphs.map((p, i) => (
              <p key={i} className='text-base text-gray-700'>{p}</p>
            ))}
          </div>
        </div>

        {/* Our process */}
        <div>
          <h2 className='text-xl md:text-2xl font-black text-primary mb-4'>{ourProcess.heading}</h2>
          <div className='space-y-4 max-w-2xl'>
            {ourProcess.paragraphs.map((p, i) => (
              <p key={i} className='text-base text-gray-700'>{p}</p>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
