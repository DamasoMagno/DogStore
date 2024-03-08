"use client"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ShoppingCart, Trash, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetClose } from "../ui/sheet"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

export function Cart() {
  const router = useRouter()
  const [productCount, setProductcount] = useState(1)

  const incrementProductCount = () => {
    setProductcount(product => product + 1)
  }

  const decrementProductCount = () => {
    if (productCount <= 0) {
      return
    }

    setProductcount(product => product - 1)
  }

  const handleCheckoutCart = () => {
    router.push("/checkout")
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="bg-transparent flex justify-center items-center text-white border-[#2A2A2A] border-2 rounded-lg w-9 h-9">
          <ShoppingCart className="text-white" size={14} />
        </button>
      </SheetTrigger>

      <SheetContent className="bg-[#0B0B0B] border-0 flex flex-col h-full px-4">
        <SheetHeader>
          <SheetClose>
            <X color="white" />
          </SheetClose>
        </SheetHeader>

        <div className="flex flex-col gap-4 h-full">
          <div className="flex items-center">
            <div className="bg-[#1A1A1A] p-4 rounded-md flex justify-center items-center w-20 h-20 mr-4 relative">
              <Image
                src="/Yama.png"
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                className="object-contain h-auto w-auto"
              />
            </div>

            <div className="flex flex-col justify-between">
              <strong className="text-white text-sm">Godhuman V4</strong>
              <p className="text-white font-bold text-base">R$ 467,93 </p>

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={decrementProductCount}
                  className="bg-transparent flex justify-center items-center text-white border-[#2A2A2A] border-2 rounded-lg w-8 h-8"
                >
                  <ChevronLeft className="text-white" size={14} />
                </button>
                <span className="text-white text-sm">{productCount}</span>
                <button
                  onClick={incrementProductCount}
                  className="bg-transparent flex justify-center items-center text-white border-[#2A2A2A] border-2 rounded-lg w-8 h-8"
                >
                  <ChevronRight className="text-white" size={14} />
                </button>
              </div>
            </div>

            <button className="bg-transparent flex justify-center items-center text-white border-[#2A2A2A] border-2 rounded-lg w-9 h-9 ml-auto">
              <Trash className="text-white" size={14} />
            </button>
          </div>

          <div className="flex items-center">
            <div className="bg-[#1A1A1A] p-4 rounded-md flex justify-center items-center w-20 h-20 mr-4 relative">
              <Image
                src="/Yama.png"
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                className="object-contain h-auto w-auto"
              />
            </div>

            <div className="flex flex-col justify-between">
              <strong className="text-white text-sm">Godhuman V4</strong>
              <p className="text-white font-bold text-base">R$ 467,93 </p>

              <div className="flex items-center gap-2 mt-2">
                <button className="bg-transparent flex justify-center items-center text-white border-[#2A2A2A] border-2 rounded-lg w-8 h-8">
                  <ChevronLeft className="text-white" size={14} />
                </button>
                <span className="text-white text-sm">1</span>
                <button className="bg-transparent flex justify-center items-center text-white border-[#2A2A2A] border-2 rounded-lg w-8 h-8">
                  <ChevronRight className="text-white" size={14} />
                </button>
              </div>
            </div>

            <button className="bg-transparent flex justify-center items-center text-white border-[#2A2A2A] border-2 rounded-lg w-9 h-9 ml-auto">
              <Trash className="text-white" size={14} />
            </button>
          </div>
        </div>

        <Button
          className="bg-[#A61C1C] hover:bg-[#A61C1C]/80 transition-colors  rounded-lg text-white text-base  justify-center items-center h-12"
          onClick={handleCheckoutCart}
        >
          Finalizar compra
        </Button>
      </SheetContent>
    </Sheet>
  )
}