import { IGame } from "@/interfaces"
import Image from "next/image"
import Link from "next/link"

interface GameProps {
  game: IGame
}

export function Game({ game }: GameProps) {
  console.log(game)

  return (
    <Link
      href={`/category/products/${game.slug}`}
      className="flex flex-col overflow-hidden max-w-[200px]"
    >
      <Image
        src={game.banner.url}
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        className="w-full object-cover max-h-[110px] rounded-md"
      />

      <strong className="text-white text-lg font-bold w-full text-center py-2">{game.nome}</strong>
    </Link>
  )
}