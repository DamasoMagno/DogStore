"use client"
import Image from "next/image"
import { useRouter } from "next/navigation";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";

export default function Checkout() {
  const router = useRouter()

  const navigateToProfile = () => {
    router.push("/profile")
  }

  return (
    <>
      <Header />

      <main className="h-[80vh] flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center gap-4 items-center">
          <Image
            src="/dog-checkout.png"
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            className="w-[128px]"
          />

          <div className="flex flex-col items-center gap-2 my-4">
            <h3 className="text-white font-bold text-3xl">Dog Store</h3>
            <p className="text-[#DADADA] max-w-[340px] w-full text-xl text-center font-bold">Agradecemos a confiança e a
              escolha por comprar em nossa loja.
            </p>
          </div>

          <Button
            className="bg-[#A61C1C] text-white font-bold text-base w-full"
            onClick={navigateToProfile}
          >
            Acessar contas
          </Button>
        </div>
      </main>
    </>
  )
}