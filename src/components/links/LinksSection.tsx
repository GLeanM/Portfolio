import { links } from "@/data/links";

export default function LinksSection() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-6 px-4 py-10 md:px-8">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={
              link.href.startsWith("mailto:")
                ? undefined
                : "noopener noreferrer"
            }
            className="text-sm"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
