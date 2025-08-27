import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

import { CartProvider } from "@/context/cart-context";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { NProgressProvider } from "@/components/nprogress-provider";
import { Providers } from "./providers";
export const metadata: Metadata = {
  title: "E-Commerce Website",
  description: "A modern e-commerce store built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <CartProvider>
            <NProgressProvider />
            <Providers>
              {children}
            </Providers>
            <Toaster position="top-right" expand={false} richColors />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
