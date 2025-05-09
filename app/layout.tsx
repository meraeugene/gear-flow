import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gear Flow | Equipments Rental Website",
  description: "Rent high-quality equipment with ease using Gear Flow.",
  icons: {
    icon: "/logo.ico",
  },
  openGraph: {
    title: "Gear Flow | Equipments Rental Website",
    description: "Rent high-quality equipment with ease using Gear Flow.",
    url: "https://gear-flow-ph.vercel.app/", // Replace with your actual URL
    siteName: "Gear Flow",
    images: [
      {
        url: "https://raw.githubusercontent.com/meraeugene/gear-flow/refs/heads/main/public/assets/images/cover.png", // Replace with your OG image path
        width: 1200,
        height: 630,
        alt: "Gear Flow - Rent Equipments Easily",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gear Flow | Equipments Rental Website",
    description: "Rent high-quality equipment with ease using Gear Flow.",
    images: [
      "https://raw.githubusercontent.com/meraeugene/gear-flow/refs/heads/main/public/assets/images/cover.png",
    ], // same image as Open Graph
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/assets/images/pwalogo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-center" richColors />
        {children}
      </body>
    </html>
  );
}
