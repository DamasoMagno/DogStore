"use client"
import { useQuery } from "@tanstack/react-query"
import Head from "next/head"

import { games } from "@/graphql/queries/games"

import { Game } from "@/components/game"
import { GameSkeleton } from "@/components/game/skeleton"
import { useParams } from "next/navigation"

type Params = {
  category: string
}

export default function Categories() {
  const { category } = useParams() as Params

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

      {
        isLoading ? (
          <div className="flex flex-col gap-6 px-4 my-8 max-w-7xl mx-auto">
            <strong className="font-bold text-lg text-white uppercase h-6 bg-white/5 w-32 rounded-md" />
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              <GameSkeleton />
            </div>
          </div >
        ) : (
          <div className="flex flex-col gap-6 px-4 my-8 max-w-7xl mx-auto">
            <strong className="font-bold text-lg text-white uppercase">Conta</strong >

            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {data?.map(game => (
                <Game
                  key={game.id}
                  game={game}
                  category={category}
                />
              ))}
            </div>
          </div>
        )}
    </>
  );
}


