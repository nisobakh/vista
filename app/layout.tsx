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
  title: "Cash Flow Copilot",
  description:
    "AI-powered cash flow analysis for small business sellers. Understand your money in, money out, and weekly outlook.",
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
