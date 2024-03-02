"use client"
import { ArrowDownWideNarrow } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"

import { products } from "@/graphql/queries/products"

import { Product } from "@/components/product"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductSkeleton } from "@/components/product-skeleton"

type Params = {
  category: string;
  slug: string;
}

export default function Products() {
  const { category, slug } = useParams() as Params

  const { data, isLoading } = useQuery({
    queryKey: ["products", slug, category],
    queryFn: async () => {
      const response = await products({ game: slug, category: category });
      return response
    }
  })

  return isLoading ? (
    <div className="flex flex-col gap-6 px-4 my-8 max-w-7xl mx-auto">
      <strong className="font-bold text-lg text-white uppercase h-6 bg-white/5 w-32 rounded-md" />
      <div className="w-[140px] bg-white/5 h-10 rounded-md" />
      <div className="grid gap-4 grid-cols-2 mobile:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-6 px-4 my-8 max-w-7xl mx-auto">
      <strong className="font-bold text-lg text-white uppercase">{data?.category.name}</strong>

      <div className="flex items-center gap-4 max-w-[200px]">
        <Select>
          <SelectTrigger className="bg-[#18181B]/20 border-dashed border-[1px] border-[#3F3F46] text-[#71717A] w-auto flex items-center gap-4">
            <ArrowDownWideNarrow size={16} />
            <SelectValue placeholder="Ordenar" className="text-red-500" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="a">Menor preço</SelectItem>
            <SelectItem value="a">Maior preço</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 grid-cols-2 mobile:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {data?.products.map(product => <Product key={product.id} product={product} />)}
      </div>
    </div>
  )
}


