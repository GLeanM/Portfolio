import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Site",
  description: "About me, my projects, and a Pong mini-game",
};

const NAV_LINKS = [
  { href: "/", label: "About" },
  { href: "/game", label: "Play Pong" },
  { href: "/leaderboard", label: "Leaderboard" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-black/10 dark:border-white/10">
          <nav className="max-w-3xl mx-auto px-4 py-4 flex gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium hover:underline underline-offset-4"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </header>
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
