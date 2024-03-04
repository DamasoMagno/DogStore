"use client"
import Image from "next/image"
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { product } from "@/graphql/queries/product";
import { formatPrice } from "@/utils/format-price";
import { recomendedProducts } from "@/graphql/queries/recomended-products";
import { Games } from "@/components/games";
import { Products } from "@/components/products";
import { ProductSkeleton } from "@/components/product-skeleton";

type Params = {
  slug: string
}

export default function Product() {
  const params = useParams() as Params

  const { data, isLoading } = useQuery({
    queryKey: ["product", params.slug],
    queryFn: async () => {
      const response = await product()
      return response
    }
  })

  const { data: recomended, isLoading: loadingRecomendeds } = useQuery({
    queryKey: [
      "recomended",
      data?.product.categories, data?.product.jogo
    ],
    queryFn: async () => {
      const response = await recomendedProducts()
      return response
    },
    enabled: !isLoading
  })

  console.log(recomended)

  return (
    <>
      <main className="grid lg:grid-cols-2 gap-12 items-center my-4 max-w-7xl mx-auto px-4">
        {isLoading ? (
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
            <section className="bg-[#1A1A1A] rounded-md  h-[50vh] md:min-h-[70vh] flex items-center justify-center">
              <Image
                src={data?.product.image.url ?? ""}
                alt=""
                sizes="100vw"
                width={0}
                height={0}
                className="w-[80%]"
              />
            </section>

            <section className="flex flex-col justify-between h-full">
              <div className="flex flex-col justify-between gap-4">
                <strong className="text-white font-normal text-2xl">{data?.product.name}</strong>

                <span className="text-white block text-3xl font-extrabold">{formatPrice(data?.product.price ?? 0)}</span>

                <div className="flex flex-col gap-2">
                  <small className="text-white text-sm font-bold">Descrição</small>
                  <p className="text-[#A1A1A1] text-base leading-6">
                    Lorem ipsum dolor sit amet consectetur. Lacinia venenatis nunc nulla enim nulla vel pulvinar metus.
                    Lorem ipsum dolor sit amet consectetur.

                    Lorem ipsum dolor sit amet consectetur. Lacinia venenatis nunc nulla enim nulla vel pulvinar metus.
                  </p>
                </div>
              </div>

              <Button className="bg-[#A61C1C] uppercase rounded-sm flex items-center justify-center text-white mt-8 md:mt-0">
                Finalizar compra
              </Button>
            </section>
          </>
        )}
      </main>

      <footer className="max-w-7xl mx-auto px-4 mt-12 flex flex-col gap-4">
        <strong className="text-white text-2xl">Recomendamos</strong>

        {loadingRecomendeds ? (
          <ProductSkeleton />
        ) : (
          <Products products={recomended?.products ?? []} />
        )}
      </footer>
    </>
  )
}