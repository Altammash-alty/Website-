import type { Metadata } from "next";
import { Space_Grotesk, Libre_Baskerville, Montserrat } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";

import "./globals.css";
import "./embla.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre-baskerville",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-montserrat",
});

// Metadata
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.name,
      url: new URL(siteConfig.url),
    },
  ],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "./favicon.ico",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["./favicon.ico"],
    creator: "@akkhil_dev",
  },
  icons: {
    icon: "./favicon.ico",
    shortcut: "./favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider>
        <body className={`${spaceGrotesk.className} ${libreBaskerville.variable} ${montserrat.variable} antialiased bg-black`}>
          <Navbar />
          <Cursor />
          <SmoothScroll>
            {children}
          </SmoothScroll>
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
