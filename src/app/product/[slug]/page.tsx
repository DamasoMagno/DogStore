"use client"
import Image from "next/image"
import { useParams } from "next/navigation";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { product } from "@/graphql/queries/product";

export default function Product() {
  const params = useParams() as { slug: string }

  const { data, isLoading } = useQuery({
    queryKey: ["product", params.slug],
    queryFn: async () => {
      const response = await product()
      return response
    }
  })

  return (
    <>
      {isLoading ?
        <h1>Carregando</h1> :
        <main className="grid lg:grid-cols-2 gap-12 items-center my-4 max-w-7xl mx-auto px-4">
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

              <span className="text-white block text-3xl font-extrabold">{new Intl.NumberFormat("pt-br", {
                currency: "brl", style: "currency"
              }).format(data?.product.price ?? 0)}</span>

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
        </main>}


      <div className="max-w-7xl px-4 py-8 mx-auto flex flex-col gap-4">
        <strong className="text-white text-lg">Recomendamos</strong>
        {/* <List /> */}
      </div>
    </>
  )
}