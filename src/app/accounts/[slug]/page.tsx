"use client"
import { ArrowDownUp } from "lucide-react"
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

interface AccProps {
  category: string;
  accounts: any[];
}

export default function Products() {
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

  const { data: accountsInfo, isLoading: loadingAccounts } = useQuery({
    queryKey: ["accounts", slug, priceSort, category],
    queryFn: async () => {
      const response = await accounts({ slug });
      return response.accounts
    }
  })

  const formatAccounts = accountsInfo?.reduce((acc: AccProps[], account) => {
    const index = acc.findIndex(item => item.category === account.category.name);

    if (index !== -1) {
      acc[index].accounts.push(account);
    } else {
      acc.push({ category: account.category.name, accounts: [account] });
    }

    return acc;
  }, []);


  return (
    <main className="flex flex-col gap-4 px-4 my-8 max-w-7xl mx-auto">
      {loadingGame ?
        <strong className="font-bold text-lg text-white uppercase h-6 bg-white/5 w-32 rounded-md" />
        :
        <strong className="font-bold text-lg text-white uppercase">{gameInfo?.name}</strong>
      }


      {loadingAccounts ?
        <div className="flex flex-col gap-4">
          <strong className="font-bold text-lg text-white uppercase h-6 bg-white/5 w-32 rounded-md" />
          <div className="grid gap-4 grid-cols-2 mt-4 mobile:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {
              Array.from({ length: 3 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            }
          </div>
        </div>
        : formatAccounts?.map((item) => (
          <div key={item.category} className="flex flex-col gap-4">
            <strong className="text-white">{item.category}</strong>

            {item.accounts.map((account) => (
              <Product
                key={account.id}
                product={account}
                category="account"
              />
            ))}
          </div>
        ))}
    </main>
  )
}


