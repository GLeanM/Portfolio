"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { photos } from "@/data/photos";

export default function PhotoCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    // Syncing local state from the embla API instance on init and on its
    // own events — this is embla's documented subscription pattern.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi]);

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-light tracking-tight">Snapshots</h2>
      <div className="relative">
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
                  unoptimized
                  preload={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous photo"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/50 p-2 text-white backdrop-blur hover:border-white/30"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next photo"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/50 p-2 text-white backdrop-blur hover:border-white/30"
        >
          ›
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            aria-label={`Go to photo ${index + 1}`}
            className={
              index === selectedIndex
                ? "h-2 w-2 rounded-full bg-sky-400"
                : "h-2 w-2 rounded-full bg-white/20 hover:bg-white/40"
            }
          />
        ))}
      </div>
    </section>
  );
}
