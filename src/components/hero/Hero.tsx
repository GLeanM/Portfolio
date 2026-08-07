"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MountainSilhouette, ClimberSilhouette } from "@/components/decor/RockClimbing";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const climberY = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="sticky top-0 z-0 flex h-dvh items-center justify-center overflow-hidden bg-background"
    >
      <motion.div aria-hidden style={{ y: backgroundY }} className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #e5e5e5 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <MountainSilhouette className="absolute bottom-0 left-0 h-[45vh] w-full" />
      </motion.div>

      <motion.div
        aria-hidden
        style={{ y: climberY }}
        className="absolute left-[43%] top-[53%] h-24 w-24 -translate-x-1/2 -rotate-6"
      >
        <ClimberSilhouette className="h-full w-full" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-col items-center gap-4 px-4 text-center"
      >
        <h1 className="text-5xl font-light tracking-tight sm:text-8xl">
          Michael Glean
        </h1>
        <p className="max-w-md sm:text-lg">
          Software Engineer
        </p>
      </motion.div>

      <motion.span
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest"
      >
      </motion.span>
    </section>
  );
}
