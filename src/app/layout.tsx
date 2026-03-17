import type { Metadata } from "next";
import { Poppins, Work_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { CartProvider } from "@/context/CartContext";
import { WaitlistProvider } from "@/components/waitlist/WaitlistProvider";

const displayFont = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const bodyFont = Work_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
        <CartProvider>
          <WaitlistProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </WaitlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
