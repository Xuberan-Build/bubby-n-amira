import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { CartProvider } from "@/context/CartContext";
import { CustomerProvider } from "@/context/CustomerContext";
import { WaitlistProvider } from "@/components/waitlist/WaitlistProvider";

// Self-hosted (latin subset) rather than next/font/google: Google Fonts now
// serves /l/font?kit=…&skey=… URLs that Turbopack's font loader rejects
// ("next/font/google queries have exactly one entry"), failing Vercel builds.
const displayFont = localFont({
  variable: "--font-display",
  src: [
    { path: "./fonts/poppins-latin-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/poppins-latin-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/poppins-latin-700.woff2", weight: "700", style: "normal" },
  ],
  fallback: ["Poppins", "sans-serif"],
});

const bodyFont = localFont({
  variable: "--font-body",
  src: [
    { path: "./fonts/work-sans-latin-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/work-sans-latin-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/work-sans-latin-600.woff2", weight: "600", style: "normal" },
  ],
  fallback: ["Work Sans", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Bubby n Amira",
  description:
    "Two characters. Occasional products. Mostly just existing in their own little world.",
  metadataBase: new URL("https://bubbynamira.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable} antialiased`}>
        <Script
          src={`https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${process.env.NEXT_PUBLIC_KLAVIYO_COMPANY_ID}`}
          strategy="afterInteractive"
        />
        <CustomerProvider>
        <CartProvider>
          <WaitlistProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </WaitlistProvider>
        </CartProvider>
        </CustomerProvider>
      </body>
    </html>
  );
}
