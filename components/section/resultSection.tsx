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

const showcaseItems = [
  {
    src: "Meslina-Ismail",
    alt: "Sharpened Knives",
    user: "Meslina Ismail",
    handle: "11+ reviews",
  },
  {
    src: "shamsynar-ani",
    alt: "Sharpened Knives",
    user: "Shamsynar Ani",
    handle: "9+ reviews",
  },
  {
    src: "yoman893",
    alt: "Sharpened Knives",
    user: "Yoman",
    handle: "4+ reviews",
  },
  {
    src: "Paul-Martin",
    alt: "Sharpened Knives",
    user: "Paul Martin",
    handle: "17+ reviews",
  },
  {
    src: "Liam-English",
    alt: "Sharpened Knives",
    user: "Liam English",
    handle: "7+ reviews",
  },
  {
    src: "Eugene-Chang",
    alt: "Sharpened Knives",
    user: "Eugene Chang",
    handle: "29+ reviews",
  },
  {
    src: "Doreen-Leong",
    alt: "Sharpened Knives",
    user: "Doreen Leong",
    handle: "3+ reviews",
  },
  {
    src: "Jonathan-Jerome",
    alt: "Sharpened Knives",
    user: "Jonathan Jerome",
    handle: "7+ reviews",
  },
  {
    src: "Ryan-V",
    alt: "Sharpened Knives",
    user: "Ryan V",
    handle: "90+ reviews",
  },
]

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
          {showcaseItems.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-4 cursor-pointer">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={`/google-reviews/thumbnail/${item.src}.webp`}
                    alt={item.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-3 text-left">
                  <p className="text-sm text-muted-foreground flex items-center justify-start gap-2">
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
                  </p>
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
