import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FolderProvider } from "@/context/FolderContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ana rita's portfolio",
  description: "Explore travel photography, software projects, postcard collection, and creative works",
  keywords: ["photography", "portfolio", "travel", "software", "projects"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-[#e8e4df]">
        <FolderProvider>
          <main className="flex-1">{children}</main>
        </FolderProvider>
      </body>
    </html>
  );
}
