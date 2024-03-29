import Head from "next/head"

import { resumeProducts } from "@/graphql/queries/popular-products"

import { Games } from "@/components/games"
import { Products } from "@/components/products"

export default async function Home() {
  const { accounts, gamepasses, games } = await resumeProducts()

  return (
    <>
      <Head>
        <title>Dog Store</title>
      </Head>

      <div className="flex flex-col gap-8 px-4 my-8 max-w-7xl mx-auto">
        <section className="flex flex-col gap-5">
          <strong className="font-bold text-lg text-white uppercase">Gamepass</strong>
          <Products products={gamepasses} category="gamepass" />
        </section>

        <section className="flex flex-col gap-5">
          <strong className="font-bold text-lg text-white uppercase">Contas</strong>
          <Products products={accounts} category="account" />
        </section>

        <section className="flex flex-col gap-5">
          <strong className="font-bold text-lg text-white uppercase">Jogos recomendados</strong>
          <Games games={games} />
        </section>
      </div>
    </>
  );
}


