"use client"

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import GoogleLogo from "../ui/googlelogo";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import CopyChangeWrapper from "../abtest/CopyChangeWrapper";
import { googleReviews } from "@/constants/google_reviews";

export default function ResultSection() {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  )

  const showSection = CopyChangeWrapper({ feature: 'sharpened-results-section', children: null })
  if (!showSection) {
    return null
  }

  return (
    <div className="w-full bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 pt-12 pb-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Hundreds of knives sharpened…
      </h2>
      <Carousel opts={{ loop: true }} plugins={[autoplayPlugin.current]}>
        <CarouselContent>
          {googleReviews.filter(item => item.image).map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-4 cursor-pointer">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={`/google-reviews/thumbnail/${item.src}.webp`}
                    alt="Sharpened Knives"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-3 text-left">
                  <div className="text-sm text-muted-foreground flex items-center justify-start gap-2">
                    <Avatar className="w-9 h-9">
                      <AvatarImage src={`/google-reviews/profile/${item.src}.png`} />
                    </Avatar>
                    <div>
                      <p className="font-semibold">{item.user}</p>
                      <div className="flex items-center gap-1 text-xs">
                        <span className="inline-block w-3 h-3 [&>svg]:w-full [&>svg]:h-full">
                          <GoogleLogo />
                        </span>
                        {item.handle}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
    </div>
  )
}
