import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from './providers';
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
  title: "Magic 8 Ball",
  description: "Ask the mystical Magic 8 Ball your questions",
  openGraph: {
    title: "Magic 8 Ball",
    description: "Ask the mystical Magic 8 Ball your questions",
    images: ["/screenshot.png"],
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": process.env.NEXT_PUBLIC_HOST + "/screenshot.png",
    "og:image": process.env.NEXT_PUBLIC_HOST + "/screenshot.png",
    "fc:frame:button:1": "Ask a Question",
    "fc:frame:button:1:link": "https://magic8ball.space",
    "fc:frame:post_url": process.env.NEXT_PUBLIC_HOST + "/api/frame"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}