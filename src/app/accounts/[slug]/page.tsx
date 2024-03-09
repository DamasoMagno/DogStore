"use client"
import { ArrowDownWideNarrow } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"

import { Product } from "@/components/product"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductSkeleton } from "@/components/product/skeleton"
import { accounts } from "@/graphql/queries/accounts"
import { game } from "@/graphql/queries/game"
import { categories } from "@/graphql/queries/categories"

type Params = {
  slug: string;
}

export default function Products() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { slug } = useParams() as Params

  const priceSort = searchParams.get("price") as "price_ASC" | "price_DESC" | undefined;
  const category = searchParams.get("category") as string | undefined;

  const { data: gameInfo, isLoading: loadingGame } = useQuery({
    queryKey: ["game", slug],
    queryFn: async () => {
      const response = await game({
        slug,
      });

      return response.game
    }
  })

  const { data: categoriesAccount } = useQuery({
    queryKey: ["categories", slug],
    queryFn: async () => {
      const response = await categories();
      return response.categories
    }
  })

  const { data: accountsInfo, isLoading: loadingAccounts } = useQuery({
    queryKey: ["accounts", slug, priceSort, category],
    queryFn: async () => {
      const response = await accounts({
        slug,
        order: priceSort,
        category
      });

      return response.accounts
    }
  })


  const sortAccounts = (param: string, eventCategory: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    if (eventCategory === "price") {
      if (param !== "all") {
        params.set("price", param);
      } else {
        params.delete("price")
      }
    }

    if (eventCategory === "category") {
      if (param !== "all") {
        params.set("category", param);
      } else {
        params.delete("category")
      }
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <main className="flex flex-col gap-6 px-4 my-8 max-w-7xl mx-auto">
      {loadingGame ?
        <strong className="font-bold text-lg text-white uppercase h-6 bg-white/5 w-32 rounded-md" />
        :
        <strong className="font-bold text-lg text-white uppercase">{gameInfo?.name}</strong>
      }

      <div className="flex items-center gap-4 max-w-[200px]">
        <Select onValueChange={(e) => sortAccounts(e, "price")}>
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

        <Select onValueChange={(e) => sortAccounts(e, "category")}>
          <SelectTrigger className="bg-[#18181B]/20 border-dashed border-[1px] border-[#3F3F46] text-[#71717A] w-auto flex items-center gap-4">
            <ArrowDownWideNarrow size={16} />
            <SelectValue placeholder="Ordernar" className="text-red-500" />
          </SelectTrigger>

          <SelectContent className="z-[99999px]">
            <SelectItem value="all">Não ordenar</SelectItem>
            {categoriesAccount?.map(category => (
              <SelectItem value={category.slug} key={category.id}>{category.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 grid-cols-2 mt-8 mobile:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {loadingAccounts ?
          Array.from({ length: 3 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
          : accountsInfo?.map(account => (
            <Product
              key={account.id}
              product={account}
              category="account"
            />
          ))}
      </div>
    </main>
  )
}


