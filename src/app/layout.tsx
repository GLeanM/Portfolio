import type { Metadata } from "next";
import { Geist_Mono, Work_Sans, Bebas_Neue } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: ["400"],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Michael Glean",
  description: "About me, my projects, and a Pong mini-game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} ${bebasNeue.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
