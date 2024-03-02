"use client"
import { ArrowDownWideNarrow } from "lucide-react";

import { Header } from "@/components/header"
import { Product } from "@/components/product";

import { Select } from "@/components/ui/select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { products } from "@/graphql/queries/products";
import { ProductSkeleton } from "@/components/product-skeleton";
import { useParams } from "next/navigation";

export default function Products() {
  const params = useParams() as { slug: string }

  const { data, isLoading } = useQuery({
    queryKey: ["products", params.slug],
    queryFn: async () => {
      const response = await products();
      return response
    }
  })

  return (
    <div className="flex flex-col gap-6 px-4 my-8 max-w-7xl mx-auto">
      <strong className="font-bold text-lg text-white uppercase">Gamepass</strong>

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
        {isLoading ?
          <ProductSkeleton /> :
          data?.products.map(product => <Product key={product.id} product={product} />)}
      </div>
    </div>
  );
}


