"use client"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { ShoppingCart } from "lucide-react"
import { IProduct } from "@/interfaces"
import { useCartsStorage } from "@/store/cartStore"

interface ProductProps {
  product: {
    id: string
    slug: string
    name: string
    image: {
      url: string
    }
    price: number
  }
  category: "gamepass" | "account"
}

export function Product({ product, category }: ProductProps) {
  const { addCart } = useCartsStorage(state => ({
    addCart: state.addCart,
  }))

  function handleAddProductToCart() {
    try {
      addCart({
        id: product.id,
        name: product.name,
        photo: product.image.url,
        price: product.price,
        category: category
      })

      toast.success("Produto adicionado")
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  }

  return (
    <div className="flex flex-col max-w-[200px]">
      <Link href={`/product/${category}/${product.slug}`} className="flex flex-col gap-2 max-w-[200px]">
        <div className="bg-[#1A1A1A] rounded-md flex justify-center items-center min-h-[160px] h-full relative">
          <Image
            src={product.image.url}
            width={0}
            height={0}
            sizes="100vw"
            alt=""
            className="w-full object-contain max-h-[110px] rounded-md"
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

        <Button
          onClick={handleAddProductToCart}
          className="flex items-center gap-2 bg-[#A61C1C] border-[2px] border-transparent hover:bg-transparent hover:border-[2px] hover:border-[#A61C1C] hover:text-[#A61C1C]"
        >
          <ShoppingCart size={12} />
        </Button>
      </div>
    </div>
  )
}