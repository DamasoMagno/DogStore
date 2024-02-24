"use client"
import Image from "next/image"
import { useParams } from "next/navigation";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Products } from "@/components/products";

export default function Product() {
  const params = useParams() as { slug: string }

  return (
    <>
      <Header />

      <main className="grid lg:grid-cols-2 gap-12 items-center my-4 max-w-7xl mx-auto px-4">
        <section className="bg-[#1A1A1A] rounded-md  min-h-[70vh] flex items-center justify-center">
          <Image
            src="/Yama.png"
            alt=""
            sizes="100vw"
            width={0}
            height={0}
            className="w-[80%]"
          />
        </section>

        <section className="flex flex-col justify-between h-full">
          <div className="flex flex-col justify-between gap-4">
            <strong className="text-white font-normal text-2xl">{params.slug}</strong>

            <span className="text-white block text-3xl font-extrabold">R$ 467,93</span>

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
      </main>

      <div className="max-w-7xl px-4 py-8 mx-auto flex flex-col gap-4">
        <strong className="text-white text-lg">Recomendamos</strong>
        <Products />
      </div>
    </>
  )
}