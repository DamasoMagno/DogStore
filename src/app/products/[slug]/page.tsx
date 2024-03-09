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
import { gamepassList } from "@/graphql/queries/gamepass-list"
import { accountsList } from "@/graphql/queries/accounts-list"

type Params = {
  category: string;
  slug: string;
}

export default function Products() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { slug } = useParams() as Params

  const priceSort = searchParams.get("price") as "price_ASC" | "price_DESC" | undefined;
  const category = searchParams.get("category") as string | undefined;

  const { data: listGamepass, isLoading: loadingGame } = useQuery({
    queryKey: ["listGamepass", slug, category],
    queryFn: async () => {
      const response = await gamepassList({
        slug,
      });

      return response.gamepasses
    },
    enabled: !category || category === "gamepass"
  })

  const { data: listAccounts, isLoading: loadingAccounts } = useQuery({
    queryKey: ["listAccounts", slug, category],
    queryFn: async () => {
      const response = await accountsList({
        slug
      });
      return response.accounts
    },
    enabled: category === "gamepass"
  })


  const onSelect = (event: string, eventCategory: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    if (event && eventCategory === "price") {
      current.set("price", event);
    }

    if (event && eventCategory === "category") {
      current.set("category", event);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  return (
    <main className="flex flex-col gap-6 px-4 my-8 max-w-7xl mx-auto">
      <strong className="font-bold text-lg text-white uppercase">Termo buscado: {slug}</strong>

      <div className="flex items-center gap-4 max-w-[200px]">
        <Select onValueChange={(e) => onSelect(e, "price")}>
          <SelectTrigger className="bg-[#18181B]/20 border-dashed border-[1px] border-[#3F3F46] text-[#71717A] w-auto flex items-center gap-4">
            <ArrowDownWideNarrow size={16} />
            <SelectValue placeholder="Ordernar" className="text-red-500" />
          </SelectTrigger>

          <SelectContent className="z-[99999px]">
            <SelectItem value="price_ASC">Menor preço</SelectItem>
            <SelectItem value="price_DESC">Maior preço</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(e) => onSelect(e, "category")}>
          <SelectTrigger className="bg-[#18181B]/20 border-dashed border-[1px] border-[#3F3F46] text-[#71717A] w-auto flex items-center gap-4">
            <ArrowDownWideNarrow size={16} />
            <SelectValue placeholder="Categoria" className="text-red-500" />
          </SelectTrigger>

          <SelectContent className="z-[99999px]">
            <SelectItem value="account">Contas</SelectItem>
            <SelectItem value="gamepass">Gamepass</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 grid-cols-2 mt-8 mobile:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {loadingAccounts || loadingGame ?
          Array.from({ length: 3 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
          : (listAccounts?.length ?? 0) > 0 ? listAccounts?.map((account => (
            <Product
              key={account.id}
              product={account}
              category="account"
            />
          ))) : listGamepass?.map((account => (
            <Product
              key={account.id}
              product={account}
              category="account"
            />
          )))}
      </div>
    </main>
  )
}


