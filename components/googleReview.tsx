import { Star } from 'lucide-react';

export default function GoogleReview({ name, rating, comment }: { name: string; rating: number; comment: string }) {
  return (
    <div className='bg-white p-4 rounded-xl shadow-md max-w-sm border h-[260px] flex flex-col justify-between'>
      <div>
        <div className='flex items-center space-x-3'>
          <div className='bg-gray-300 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold'>
            {name.charAt(0).toUpperCase()}
          </div>
          <div className='flex flex-col'>
            <div className='flex items-center space-x-1'>
              <span className='font-semibold'>{name}</span>
            </div>
            <span className='text-gray-500 text-sm'>1 month ago</span>
          </div>
        </div>
        <div className='mt-2 flex space-x-1'>
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className='w-5 h-5 text-yellow-400 fill-yellow-400' />
          ))}
        </div>
        <p className='mt-2 text-gray-800'>{comment.length > 120 ? comment.slice(0, 120) + '...' : comment}</p>
      </div>
      <a
        href='https://www.google.com/search?sca_esv=25cf531ee370dd12&cs=1&output=search&kgmid=/g/11wq9d9w8j&q=Knife+Sharpening+SG+-+Picked+Up+%26+Delivered&shndl=30&source=sh/x/kp/local/m1/1&kgs=d4dd8e19452382bb#wptab=si:APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzTxfSf2bVTYW7UENpPFQEXiZNx_4ANqtcOcAuzj7P0E48orVEN8UCoDdh4htFuLm4ePPN8au9dhqGjveGp_7yYMNKZ262iopP_YbYjdhtaG6P_2nb8-jiYvZ0u_7qCdQB4yNaI8%3D'
        className='text-blue-600 font-medium mt-2 inline-block'>
        Read more
      </a>
    </div>
  );
}
