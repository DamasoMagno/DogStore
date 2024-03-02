"use client"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { games } from "@/graphql/queries/games"

import { Game } from "@/components/game"
import { GameSkeleton } from "@/components/game-skeleton"

export default function Categories() {
  const { slug } = useParams() as { slug: string }

  const { data, isLoading } = useQuery({
    queryKey: ["games", slug],
    queryFn: async () => {
      const response = await games({ slug });
      return response
    }
  })

  return isLoading ? (
    <div className="flex flex-col gap-6 px-4 my-8 max-w-7xl mx-auto">
      <strong className="font-bold text-lg text-white uppercase h-6 bg-white/5 w-32 rounded-md" />
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <GameSkeleton />
      </div>
    </div >
  ) : (
    <div className="flex flex-col gap-6 px-4 my-8 max-w-7xl mx-auto">
      <strong className="font-bold text-lg text-white uppercase">{data?.category.name
      }</strong >

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {data?.jogos.map(jogo => <Game key={jogo.id} game={jogo} />)}
      </div>
    </div >
  );
}


