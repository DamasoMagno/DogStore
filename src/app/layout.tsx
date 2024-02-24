import type { Metadata } from "next";
import { Roboto, Roboto_Condensed } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Dog Store",
  description: "Compre itens e contas de roblox conosco, a melhor loja com os melhores contatos.",
  icons: ["logo.png"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`
        ${roboto.className} 
        ${roboto_condensed.className}
        bg-[#0B0B0B]`
      }>
        {children}
      </body>
    </html>
  );
}
