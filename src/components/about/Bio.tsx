import Image from "next/image";

export default function Bio() {
  return (
    <section className="mb-12 flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border border-white/10 sm:h-32 sm:w-32">
        <Image
          src="/profile-placeholder.svg"
          alt="Portrait of Michael Glean"
          fill
          sizes="128px"
          className="object-cover"
          unoptimized
          preload
        />
      </div>
      <div>
        <h2 className="text-3xl font-light tracking-tight">Michael Glean</h2>
        <p className="mt-4">
          Hi, I&apos;m Michael Glean! I&apos;m a software engineer with a
          passion for building user-friendly applications. I love exploring
          new technologies and sharing my knowledge with others.
        </p>
      </div>
    </section>
  );
}
