import { Star } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { googleReviews } from '@/constants/google_reviews';

const GOOGLE_REVIEWS_URL = 'https://g.co/kgs/aXcTBcs';

const ReviewCard = ({
  profile,
  name,
  handle,
  rating,
  comment,
}: {
  profile: string;
  name: string;
  handle: string;
  rating: number;
  comment: string;
}) => (
  <div className='break-inside-avoid mb-4 rounded-md bg-primary p-6'>
    <div className='flex gap-1'>
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className='h-4 w-4 text-secondary fill-secondary' />
      ))}
    </div>
    <p className='mt-3 text-base font-normal leading-relaxed text-primary-foreground/70'>
      {comment}
    </p>
    <div className='mt-4 flex items-center gap-3'>
      <Avatar className='h-8 w-8'>
        <AvatarImage src={`/google-reviews/profile/${profile}.png`} alt='' />
      </Avatar>
      <div>
        <p className='text-sm font-bold text-primary-foreground'>{name}</p>
        <p className='text-xs text-primary-foreground/50'>{handle}</p>
      </div>
    </div>
  </div>
);

export default function ReviewWallSection() {
  const reviews = googleReviews.filter((r) => r.comment);

  return (
    <div className='bg-white py-16 px-6'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-3xl md:text-4xl text-primary font-black text-center'>
          FROM OUR CUSTOMERS
        </h2>
        <div className='mt-4 flex items-center justify-center gap-2'>
          <span className='text-lg font-black text-primary'>5.0</span>
          <span className='flex'>
            {[...Array(5)].map((_, i) => (
              <Star key={i} className='h-5 w-5 text-secondary fill-secondary' />
            ))}
          </span>
          <span className='text-sm text-gray-500'>163 Google reviews</span>
        </div>

        <div className='mt-10 columns-1 md:columns-2 lg:columns-4 gap-4'>
          {reviews.map((review, index) => (
            <ReviewCard
              key={index}
              profile={review.src}
              name={review.user}
              handle={review.handle}
              rating={review.rating}
              comment={review.comment}
            />
          ))}
        </div>

        <div className='mt-8 text-center'>
          <a
            href={GOOGLE_REVIEWS_URL}
            target='_blank'
            rel='noreferrer'
            className='text-sm font-bold text-primary underline underline-offset-4 hover:text-primary/70'
          >
            Read all 163 reviews on Google
          </a>
        </div>
      </div>
    </div>
  );
}
