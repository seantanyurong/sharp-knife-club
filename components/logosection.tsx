'use client'

import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
import CopyChangeWrapper from "./abtest/CopyChangeWrapper";

export default function BrandMarquee({ position }: { position: string }) {
  const ab_position = CopyChangeWrapper({feature: 'logo-section-position', children: null}) as string;

  if (ab_position !== position) {
    return null;
  }

  return (
    <div className='max-w-6xl mx-auto px-6 mt-6'>
        <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row items-center overflow-hidden w-full bg-white py-6 relative">
        {/* Static Left Text */}
        <div className="shrink-0 lg:w-[200px] text-left text-xl font-bold leading-tight text-black whitespace-nowrap z-10">
            <span className="hidden lg:inline">We Sharpen<br />Your Favorite<br />Brands</span>
            <span className="inline lg:hidden">We Sharpen Your Favorite Brands</span>
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
