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
  metadataBase: new URL(process.env.NEXT_PUBLIC_HOST || 'http://localhost:3000'),
  openGraph: {
    title: "Magic 8 Ball",
    description: "Ask the mystical Magic 8 Ball your questions",
    images: [process.env.NEXT_PUBLIC_HOST + "/screenshot.png"],
  },
  other: {
    // Main frame configuration as stringified JSON
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: process.env.NEXT_PUBLIC_HOST + "/screenshot.png",
      button: {
        title: "Ask a Question",
        action: {
          type: "launch_frame",
          name: "Magic 8 Ball",
          url: "https://magic8ball.space"
        }
      }
    }),
    
    // Individual frame meta tags (for compatibility)
    "fc:frame:image": process.env.NEXT_PUBLIC_HOST + "/screenshot.png",
    "fc:frame:button:1": "Ask a Question",
    "fc:frame:button:1:action": "launch_frame",
    
    // Ensure og:image is also set
    "og:image": process.env.NEXT_PUBLIC_HOST + "/screenshot.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full`} suppressHydrationWarning={true}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}