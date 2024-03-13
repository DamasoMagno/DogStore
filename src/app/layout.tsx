"use client"
import "./globals.css";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from "sonner"
import { Roboto } from "next/font/google"

import { Header } from "@/components/header";
import { ReactNode } from "react";

const roboto = Roboto(
  {
    subsets: ["latin"],
    weight: ["400", "700", "900"]
  }
);

const queryClient = new QueryClient()

interface RootLayoutProps {
  children: Readonly<ReactNode>
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className={`${roboto.className} bg-[#0B0B0B]`}>
          <Header />
          {children}

          <Toaster
            position="top-right"
            closeButton
          />
        </body>
      </html>
    </QueryClientProvider>
  );
}
