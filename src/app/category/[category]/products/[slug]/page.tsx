"use client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowDownWideNarrow } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"

import { products } from "@/graphql/queries/products"

import { Product } from "@/components/product"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductSkeleton } from "@/components/product-skeleton"
import { ChangeEvent, useCallback } from "react"

type Params = {
  category: string;
  slug: string;
}

export default function Products() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { category, slug } = useParams() as Params

  const priceSort = searchParams.get("price") as "price_ASC" | "price_DESC" | undefined;

  const { data, isLoading } = useQuery({
    queryKey: ["products", slug, category, priceSort],
    queryFn: async () => {
      const response = await products({
        game: slug,
        category: category,
        order: priceSort
      });
      return response
    }
  })

  const onSelect = (event: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    if (!event) {
      current.delete("price");
    } else {
      current.set("price", event);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

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
        <Select onValueChange={onSelect}>
          <SelectTrigger className="bg-[#18181B]/20 border-dashed border-[1px] border-[#3F3F46] text-[#71717A] w-auto flex items-center gap-4">
            <ArrowDownWideNarrow size={16} />
            <SelectValue placeholder="Ordenar" className="text-red-500" />
          </SelectTrigger>

          <SelectContent className="z-[99999px]">
            <SelectItem value="price_ASC">Menor preço</SelectItem>
            <SelectItem value="price_DESC">Maior preço</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 grid-cols-2 mt-8 mobile:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {data?.products.map(product => <Product key={product.id} product={product} />)}
      </div>
    </div>
  )
}


