"use client"
import { ArrowDownWideNarrow } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"

import { game } from "@/graphql/queries/game"
import { products } from "@/graphql/queries/products"

import { Product } from "@/components/product"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductSkeleton } from "@/components/product/skeleton"

type Params = {
  slug: string;
}

export default function Products() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { slug } = useParams() as Params

  const priceSort = searchParams.get("price") as "price_ASC" | "price_DESC";

  const { data: gamepass, isLoading: loadingGamepass } = useQuery({
    queryKey: ["gamepass", slug, priceSort],
    queryFn: async () => {
      const response = await products({
        slug,
        order: priceSort
      });

      return response.gamepasses
    }
  })

  const { data: gameInfo, isLoading: loadingGame } = useQuery({
    queryKey: ["game", slug],
    queryFn: async () => {
      const response = await game({
        slug,
      });

      return response.game
    }
  })

  const sortProducts = (param: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    if (param !== "all") {
      params.set("price", param);
    } else {
      params.delete("price")
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <main className="flex flex-col gap-6 px-4 my-8 max-w-7xl mx-auto">
      {loadingGame ?
        (<strong className="font-bold text-lg text-white uppercase h-6 bg-white/5 w-32 rounded-md" />) :
        (<strong className="font-bold text-lg text-white uppercase">{gameInfo?.name}</strong>)
      }

      <div className="flex items-center gap-4 max-w-[200px]">
        <Select onValueChange={sortProducts}>
          <SelectTrigger className="bg-[#18181B]/20 border-dashed border-[1px] border-[#3F3F46] text-[#71717A] w-auto flex items-center gap-4">
            <ArrowDownWideNarrow size={16} />
            <SelectValue placeholder="Ordernar" className="text-red-500" />
          </SelectTrigger>

          <SelectContent className="z-[99999px]">
            <SelectItem value="all">Não ordenar</SelectItem>
            <SelectItem value="price_ASC">Menor preço</SelectItem>
            <SelectItem value="price_DESC">Maior preço</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 grid-cols-2 mt-8 mobile:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {loadingGamepass ?
          Array.from({ length: 3 }).map((_, index) => (
            <ProductSkeleton key={index} />
          )) :
          gamepass?.map(product => (
            <Product
              key={product.id}
              product={product}
              category="gamepass"
            />
          ))}
      </div>
    </main>
  )
}
