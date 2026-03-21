import React from "react"
import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";

import "./globals.css";

const _dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});
const _jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Vista",
  description:
    "A 30-day cash-flow checkup for small local businesses.",
};

export const viewport: Viewport = {
  themeColor: "#f5f0eb",
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
      </body>
    </html>
  );
}
