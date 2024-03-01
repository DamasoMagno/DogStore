"use client"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { Game } from "@/components/game";
import { Header } from "@/components/header"
import { games } from "@/graphql/queries/games";
import { GameSkeleton } from "@/components/game-skeleton";

export default function Categories() {
  const params = useParams() as { slug: string }

  const { data, isLoading } = useQuery({
    queryKey: ["games", params.slug],
    queryFn: async () => {
      const response = await games();
      return response
    }
  })

  return (
    <>
      <Header />

      <div className="flex flex-col gap-6 px-4 my-8 max-w-7xl mx-auto">
        <strong className="font-bold text-lg text-white uppercase">{params.slug}</strong>

        <div className="grid gap-4 mobile:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {isLoading ? <GameSkeleton /> : data?.jogos.map(jogo => (
            <Game key={jogo.id} game={jogo} />
          ))}
        </div>
      </div>
    </>
  );
}


