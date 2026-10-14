import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LayoutClient from "./layout-client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ana Rita Diogo | Portfolio",
    template: "%s | Ana Rita Diogo",
  },
  description: "A personal corner of the internet by Ana Rita Diogo, featuring a growing collection of postcards.",
  keywords: ["Ana Rita Diogo", "personal website", "postcards", "travel"],
  openGraph: {
    title: "Ana Rita Diogo | Portfolio",
    description: "A personal corner of the internet by Ana Rita Diogo, featuring a growing collection of postcards.",
    siteName: "Ana Rita Diogo",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-[#e8e4df]" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>
        <LayoutClient>
          <main className="flex-1">{children}</main>
        </LayoutClient>
      </body>
    </html>
  );
}
