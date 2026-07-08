import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Taste of India — Fresh Fast Food, Delivered Fast",
    template: "%s | Taste of India",
  },
  description:
    "Order pizza, momos, burgers, rolls, shakes & more from Taste of India. Fresh ingredients, fast delivery, and unbeatable taste. Dine-in, takeaway & home delivery available.",
  keywords: [
    "pizza delivery",
    "fast food",
    "momos",
    "burgers",
    "online food order",
    "Taste of India",
    "restaurant",
    "food delivery India",
  ],
  openGraph: {
    title: "Taste of India — Fresh Fast Food, Delivered Fast",
    description:
      "Order pizza, momos, burgers, rolls, shakes & more. Fast delivery with fresh ingredients.",
    type: "website",
    locale: "en_IN",
    siteName: "Taste of India",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <meta name="theme-color" content="#B22222" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}
