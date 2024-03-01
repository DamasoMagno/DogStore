import { IGame } from "@/interfaces"
import Image from "next/image"
import Link from "next/link"

interface GameProps {
  game: IGame
}

export function Game({ game }: GameProps) {
  return (
    <Link
      href="/category/products/blox-fruit"
      className="flex flex-col overflow-hidden max-w-[200px]"
    >
      <Image
        src="/category.png"
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        className="w-[100%] rounded-md"
      />

      <strong className="text-white text-lg font-bold w-full text-center py-2">{game.nome}</strong>
    </Link>
  )
}