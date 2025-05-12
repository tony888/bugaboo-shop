"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AutoPlay from "embla-carousel-autoplay";

interface EventPosterProps {
  images: string[];
  className?: string;
  showPlaceholder?: boolean;
}

export function EventPoster({ images, className = "" }: EventPosterProps) {
  return (
    <div className="relative">
      <Carousel className="w-full" plugins={[AutoPlay({ delay: 7000 })]}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
               <div className="relative min-h-[350px] w-full rounded-2xl shadow-lg aspect-[57/80]">
                <Image
                  src={image}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index === 0}
                  alt={`event-poster-${index + 1}`}
                  className={cn(
                    "rounded-lg object-contain object-center",
                    className,
                  )}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </>
        )}
      </Carousel>
    </div>
  );
}
