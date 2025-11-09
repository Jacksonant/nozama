import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import HeaderWrapper from "@/components/composite/HeaderWrapper";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Todo: SEO at every products
export const metadata: Metadata = {
  title: "Nozama - Your Online Store | Best Products at Great Prices",
  description: "Discover thousands of quality products at unbeatable prices. Shop makeup, beauty products, and more with fast shipping and easy returns at Nozama.",
  keywords: "online shopping, makeup, beauty products, cosmetics, affordable prices, fast shipping",
  authors: [{ name: "Nozama" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black`}
      >
        <HeaderWrapper />
        <main className="min-h-screen" role="main">
          {children}
        </main>
        <Toaster position="top-right" richColors expand closeButton />
      </body>
    </html>
  );
}
