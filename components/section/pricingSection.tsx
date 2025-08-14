import Image from 'next/image'
import WhatsappLink from '../ui/whatsapp'

function PricingSection() {

  return (
    <div className='bg-primary px-6 relative'>
      <div className='max-w-6xl mx-auto flex flex-col-reverse lg:flex-row lg:gap-8'>
        <div className=' flex justify-center'>
          <Image src={`/images/price-alt.png`} alt='Price' width={500} height={500} />
        </div>
        <div className=' mt-8 lg:my-0 lg:mt-0 flex flex-col justify-center'>
          <h1 className='text-primary-foreground text-3xl md:text-4xl font-black'>PRICING</h1>
          <div className='mt-4 flex gap-4 flex-col'>
            <div className='bg-muted rounded-md p-4'>
              <h1 className='text-lg md:text-2xl font-black'>1 BLADE - $35 PER KNIFE</h1>
            </div>
            <div className='bg-muted rounded-md p-4'>
              <h1 className='text-lg md:text-2xl font-black'>2 BLADES - $20 PER KNIFE</h1>
            </div>
            <WhatsappLink origin='pricing'>
              <div className='bg-secondary rounded-md p-4 relative'>
                <h1 className='text-lg md:text-2xl text-white font-black'>3+ BLADES — $15 PER KNIFE</h1>
                <Image
                  src={'/images/best-deal.png'}
                  alt='Price'
                  width={80}
                  height={80}
                  className='absolute -top-8 -right-6 z-99'
                />
              </div>
            </WhatsappLink>
          </div>
          <p className='mt-4 italic text-primary-foreground'>Free pickup and delivery. Free repair of small chips. Additional costs for larger repairs.</p>
        </div>
      </div>
    </div>
  )
}

export default PricingSection
