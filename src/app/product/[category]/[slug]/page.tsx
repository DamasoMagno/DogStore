"use client"
import Image from "next/image"
import { useCartsStorage } from "../../../../store/cartStore"
import Markdown from 'react-markdown'
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { product } from "@/graphql/queries/product";
import { formatPrice } from "@/utils/format-price";
import { recomendedProducts } from "@/graphql/queries/recomended-products";

import { Button } from "@/components/ui/button"
import { Products } from "@/components/products"
import { ProductSkeleton } from "@/components/product/skeleton"
import Head from "next/head";
import { account } from "@/graphql/queries/account";
import { game } from "@/graphql/queries/game"
import { toast } from "sonner"

type Params = {
  slug: string
  category: string
}

export default function Product() {
  const { addProduct, products } = useCartsStorage(state => ({
    addProduct: state.addCart,
    products: state.products
  }))

  const { category, slug } = useParams() as Params

  const { data: gamePassInfo, isLoading: isloadingGamepass } = useQuery({
    queryKey: ["gamepass-info", slug, category],
    queryFn: async () => {
      const response = await product({ slug })
      return response.gamepass
    },
    enabled: category === "gamepass"
  })

  const { data: accountInfo, isLoading: isLoadingAccount } = useQuery({
    queryKey: ["account-info", slug, category],
    queryFn: async () => {
      const response = await account({ slug })
      return response.account
    },
    enabled: category === "account"
  })

  return (
    <>
      <Head>
        <title>Dog Store | Produto</title>
      </Head>

      <main className="grid lg:grid-cols-2 gap-12 items-center my-4 max-w-7xl mx-auto px-4">
        {isloadingGamepass || isLoadingAccount ? (
          <>
            <section className="bg-[#1A1A1A] rounded-md  h-[50vh] md:min-h-[70vh] flex items-center justify-center">
              <div className="w-[80%]" />
            </section>

            <section className="flex flex-col justify-between h-full">
              <div className="flex flex-col justify-between gap-4">
                <strong className="text-white font-normal text-2xl bg-white/5 h-8 w-32 rounded-md" />

                <span className="text-white block text-3xl font-extrabold bg-white/5 h-8 w-64 rounded-md" />

                <div className="flex flex-col gap-2">
                  <small className="text-white text-sm font-bold w-32 h-4 bg-white/5" />
                  <p className="text-[#A1A1A1] text-base leading-6 h-4 w-full bg-white/5" />
                  <p className="text-[#A1A1A1] text-base leading-6 h-4 w-full bg-white/5" />
                  <p className="text-[#A1A1A1] text-base leading-6 h-4 w-full bg-white/5" />
                </div>
              </div>

              <div className="w-full h-12 bg-white/5 rounded-md block mt-8 md:mt-0" />
            </section>
          </>
        ) : (
          <>
            {accountInfo ? (
              <>
                <section className="bg-[#1A1A1A] rounded-md  h-[50vh] md:min-h-[70vh] flex items-center justify-center">
                  <Image
                    src={accountInfo.image.url ?? ""}
                    alt=""
                    sizes="100vw"
                    width={0}
                    height={0}
                    className="w-[80%]"
                  />
                </section>

                <section className="flex flex-col justify-between h-full">
                  <div className="flex flex-col justify-between gap-4">
                    <strong className="text-white font-normal text-2xl">{accountInfo.name}</strong>

                    <span className="text-white block text-3xl font-extrabold">{formatPrice(accountInfo.price ?? 0)}</span>

                    <div className="flex flex-col gap-2">
                      <small className="text-white text-sm font-bold">Descrição</small>
                      <p className="text-[#A1A1A1] text-base leading-6">
                        {accountInfo.email}
                      </p>

                      <p className="text-[#A1A1A1] text-base leading-6">
                        {accountInfo.password}
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      addProduct({
                        id: gamePassInfo?.id ?? "",
                        name: gamePassInfo?.name ?? "",
                        price: gamePassInfo?.price ?? 0,
                        photo: gamePassInfo?.image.url ?? "",
                        category: "account"
                      })

                      toast.success("Produto adicionado")
                    }}
                    className="bg-[#A61C1C] uppercase rounded-sm flex items-center justify-center text-white mt-8 md:mt-0"
                  >
                    Adicionar
                  </Button>
                </section>
              </>
            ) : (
              <>
                <section className="bg-[#1A1A1A] rounded-md  h-[50vh] md:min-h-[70vh] flex items-center justify-center">
                  <Image
                    src={gamePassInfo?.image.url ?? ""}
                    alt=""
                    sizes="100vw"
                    width={0}
                    height={0}
                    className="w-[80%]"
                  />
                </section>

                <section className="flex flex-col justify-between h-full">
                  <div className="flex flex-col justify-between gap-4">
                    <strong className="text-white font-normal text-2xl">{gamePassInfo?.name}</strong>

                    <span className="text-white block text-3xl font-extrabold">{formatPrice(gamePassInfo?.price ?? 0)}</span>

                    <div className="flex flex-col gap-2">
                      <small className="text-white text-sm font-bold">Descrição</small>
                      <Markdown className="text-[#A1A1A1] text-base">
                        {gamePassInfo?.description.markdown}
                      </Markdown>
                    </div>
                  </div>

                  <Button
                    className="bg-[#A61C1C] uppercase rounded-sm flex items-center justify-center text-white mt-8 md:mt-0"
                    onClick={() => {
                      addProduct({
                        id: gamePassInfo?.id ?? "",
                        name: gamePassInfo?.name ?? "",
                        price: gamePassInfo?.price ?? 0,
                        photo: gamePassInfo?.image.url ?? "",
                        category: "gamepass"
                      })

                      toast.success("Produto adicionado")
                    }}
                  >
                    Adicionar
                  </Button>
                </section>
              </>
            )}

          </>
        )}
      </main>

      <footer className="max-w-7xl mx-auto px-4 mt-12 flex flex-col gap-4">
        <strong className="text-white text-2xl">Recomendamos</strong>

        {/* {loadingRecomendeds ? (
          <ProductSkeleton />
        ) : (
          <Products products={recomended?.products ?? []} />
        )} */}
      </footer>
    </>
  )
}