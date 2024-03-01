"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { ShoppingCart } from "lucide-react"
import { IProduct } from "@/interfaces"

interface ProductProps {
  product: IProduct
}

export function Product({ product }: ProductProps) {
  return (
    <div className="flex flex-col max-w-[200px]">
      <Link href={`/product/Yama`} className="flex flex-col gap-2 max-w-[200px]">
        <div className="bg-[#1A1A1A] rounded-md flex justify-center items-center min-h-[160px] h-full relative">
          <Image
            src="/Yama.png"
            width={0}
            height={0}
            sizes="100vw"
            alt=""
            className="w-full max-h-[100%] max-w-[70%] object-contain"
          />
        </div>

        <div>
          <p className="text-sm text-white font-normal">{product.name}</p>
        </div>
      </Link>

      <div className="flex items-center justify-between">
        <strong className="text-white font-bold text-lg">
          {new Intl.NumberFormat("pt-br", {
            currency: "brl", style: "currency"
          }).format(product.price)}
        </strong>

        <Button className="flex items-center gap-2 bg-[#A61C1C] border-[2px] border-transparent hover:bg-transparent hover:border-[2px] hover:border-[#A61C1C] hover:text-[#A61C1C]">
          <ShoppingCart size={12} />
        </Button>
      </div>
    </div>
  )
}