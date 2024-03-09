"use client"
import Head from "next/head"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { games } from "@/graphql/queries/games"

import { Game } from "@/components/game"
import { GameSkeleton } from "@/components/game/skeleton"

type Params = {
  category: string
}

export default function Categories() {
  const { category } = useParams() as Params
  const sectionTitle = category === "account" ? "Conta" : "Gamepass"

  const { data, isLoading } = useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      const response = await games();
      return response.games
    }
  })

  return (
    <>
      <Head>
        <title>Dog Store | Jogos</title>
      </Head>

      <main className="flex flex-col gap-6 px-4 my-8 max-w-7xl mx-auto">
        <strong className="font-bold text-lg text-white uppercase">{sectionTitle}</strong>

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {isLoading ? Array.from({ length: 3 }).map((_, index) => (
            <GameSkeleton key={index} />
          )) : data?.map(game => (
            <Game
              key={game.id}
              game={game}
              category={category}
            />
          ))}
        </div>
      </main>

    </>
  );
}


