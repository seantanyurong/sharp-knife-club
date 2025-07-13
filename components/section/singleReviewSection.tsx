import { Star } from 'lucide-react'
import Balancer from 'react-wrap-balancer'
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export default function SingleReviewSection() {
  return (
    <div className='bg-white py-16 px-6'>
      <div className='max-w-3xl mx-auto text-center'>
        <div className='flex space-x-1 mx-auto justify-center'>
          {[...Array(5)].map((_, i) => (
            <Star key={i} className='w-8 h-8 text-secondary fill-secondary' />
          ))}
        </div>
        <p className='mt-6 text-xl'><Balancer>“Extremely efficient with pick up and drop off. Great communication and also loved how sharp the knives were after! 100% recommend.”</Balancer></p>
        <div className='flex justify-center gap-4 items-center mt-6'>
          <Avatar>
            <AvatarImage src="/images/karmen.png" />
          </Avatar>
          <div className='text-left'>
            <p className='font-bold'>Karmen Tang | @tangkarmen on IG</p>
            <p className='font-normal text-sm'>A Food & Wellness Influencer with 13.7k Followers</p>
          </div>
        </div>
      </div>
    </div>
  )
}
