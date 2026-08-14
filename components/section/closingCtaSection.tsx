import Image from 'next/image';
import { Suspense } from 'react';
import WhatsAppLink from '../ui/whatsapp';
import WhatsAppIcon from '../ui/whatsappIcon';
import { Button } from '../ui/button';
import NextPickupDate from '../NextPickupDate';

export default async function ClosingCtaSection() {
  return (
    <div className="relative overflow-hidden bg-primary py-20 lg:py-28">
      <Image
        src="/images/contact-bg.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/70" aria-hidden />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-balance text-primary-foreground">
          A DULL KNIFE ISN’T JUST ANNOYING — IT’S DANGEROUS
        </h2>
        <p className="mt-5 max-w-xl text-base md:text-lg text-balance text-white/75">
          Blunt blades slip and need more force. Sharp ones do the work for you.
          Free pickup, back at your door within 24 hours.
        </p>

        <div className="mt-8 w-full lg:w-auto">
          <WhatsAppLink origin="closing_cta">
            <Button
              variant={'secondary'}
              size={'xl'}
              className="w-full lg:w-auto px-12 text-lg font-black tracking-widest uppercase"
            >
              <WhatsAppIcon />
              Book Knife Pickup
            </Button>
          </WhatsAppLink>
          <p className="mt-3 text-sm font-light text-white/70">
            Next collection:{' '}
            <Suspense fallback={<span>Saturday</span>}>
              <NextPickupDate />
            </Suspense>
          </p>
          <p className="mt-1 text-xs font-light text-white/50">
            We answer 24/7 and reply in under 10 minutes most of the time.
          </p>
        </div>
      </div>
    </div>
  );
}
