import { IGame } from "@/interfaces"
import Image from "next/image"
import Link from "next/link"

interface GameProps {
  game: IGame
  category?: string
}

export function Game({ game, category = "account" }: GameProps) {
  return (
    <Link
      href={`/category/${category}/products/${game.slug}`}
      className="flex flex-col justify-between overflow-hidden max-w-[200px] min-h-[160px]"
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