"use client"
import type { Metadata } from "next";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Roboto, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";

const roboto = Roboto(
  {
    subsets: ["latin"],
    weight: ["400", "700", "900"]
  }
);

const roboto_condensed = Roboto_Condensed(
  {
    subsets: ["latin"],
    weight: ["400", "700", "900"]
  }
);

// export const metadata: Metadata = {
//   title: "Dog Store",
//   description: "Compre itens e contas de roblox conosco, a melhor loja com os melhores contatos.",
//   icons: ["logo.png"]
// };

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className={`${roboto.className} bg-[#0B0B0B]`}>
          <Header />
          {children}
        </body>
      </html>
    </QueryClientProvider>
  );
}
