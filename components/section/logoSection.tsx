'use client'

import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";

export default function BrandMarquee() {

  return (
    <div className='max-w-7xl mx-auto px-6 my-6 lg:my-12 bg-muted'>
      <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row items-center overflow-hidden w-full bg-muted py-6 relative">
        {/* Static Left Text */}
        <div className="shrink-0 lg:w-[200px] text-center lg:text-left text-xl font-black leading-tight text-balance text-black lg:whitespace-nowrap z-10">
          <span className="hidden lg:inline">WE SHARPEN<br />YOUR FAVOURITE<br />BRANDS</span>
          <span className="inline lg:hidden">WE SHARPEN YOUR FAVOURITE BRANDS</span>
        </div>

        {/* Vertical Divider */}
        <div className="hidden lg:block shrink-0 h-16 w-px bg-gray-300 z-30" />

        {/* Scrolling Logos */}
        <div className="flex-1 relative z-0">
          <Marquee speed={50}>
            <div className="flex gap-16 items-center">
              {[
                "zwilling.svg",
                "chicago_cutlery.svg",
                "dalstrong.svg",
                "hoffritz.svg",
                "miyabi.png",
                "santoku.png",
                "cutco.svg",
                "spyderco.svg",
                "wusthof.svg",
              ].map((logo, i) => (
                <Image
                  key={i}
                  src={`/brands/${logo}`}
                  alt={logo.replace(".svg", "")}
                  width={100}
                  height={40}
                  className="object-contain h-10 w-auto"
                />
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
}
