import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NIFE Transport Services LLC - Reliable Freight Shipping & Trucking",
  description: "Professional freight shipping and trucking services across the United States. NIFE Transport Services LLC offers reliable, efficient transportation solutions for all your logistics needs.",
  keywords: ["freight shipping", "trucking services", "logistics", "transportation", "freight transport", "NIFE Transport"],
  authors: [{ name: "NIFE Transport Services LLC" }],
  openGraph: {
    title: "NIFE Transport Services LLC - Reliable Freight Shipping & Trucking",
    description: "Professional freight shipping and trucking services across the United States.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
