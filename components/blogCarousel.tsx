import { Carousel, CarouselContent, CarouselNext, CarouselPrevious, CarouselPreviousNoAbsolute, CarouselNextNoAbsolute } from "@/components/ui/carousel"
import BlogCarouselItem from "./blogCarouselItem"


export default function BlogCarousel() {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <Carousel className="flex flex-col">
        <CarouselPrevious className="hidden min-[900px]:flex" />
        <CarouselContent>
          <BlogCarouselItem />
        </CarouselContent>
        <CarouselNext className="hidden min-[900px]:flex" />
        <div className="flex items-center justify-center min-[900px]:hidden">
          <CarouselPreviousNoAbsolute />
          <CarouselNextNoAbsolute />
        </div>
      </Carousel>
    </div>
  )
}
