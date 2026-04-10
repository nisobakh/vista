import React from "react"
import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const _dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const _jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Vista — See what your bank balance isn't telling you",
  description:
    "Vista looks at your last 90 days of transactions and tells you what's coming financially — before it hits. Built for food truck owners and small local businesses.",
  openGraph: {
    title: "Vista — See what your bank balance isn't telling you",
    description:
      "Vista looks at your last 90 days of transactions and tells you what's coming financially — before it hits. Built for food truck owners and small local businesses.",
    url: "https://vista-cash.vercel.app",
    siteName: "Vista",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vista — See what your bank balance isn't telling you",
    description:
      "Vista looks at your last 90 days of transactions and tells you what's coming financially — before it hits.",
  },
  metadataBase: new URL("https://vista-cash.vercel.app"),
};

export const viewport: Viewport = {
  themeColor: "#f5f0eb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${_dmSans.variable} ${_jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}