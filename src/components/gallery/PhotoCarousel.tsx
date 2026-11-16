"use client";

import { useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { photos } from "@/data/photos";

const AUTOPLAY_INTERVAL_MS = 5000;

export default function PhotoCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-4xl font-light tracking-tight">My Life</h2>
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {photos.map((photo, index) => (
            <div
              key={photo.src}
              className="relative aspect-[4/3] min-w-0 flex-[0_0_85%] pr-4 sm:flex-[0_0_60%]"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 60vw, 85vw"
                className="rounded-lg object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
