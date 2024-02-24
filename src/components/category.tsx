import Image from "next/image"
import Link from "next/link"

export function Category() {
  return (
    <Link
      href="/category/products/blox-fruit"
      className="flex flex-col bg-[#1A1A1A] rounded-lg overflow-hidden"
    >
      <Image
        src="/category.png"
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        className="w-[100%]"
      />

      <strong className="text-white text-lg font-bold w-full text-center py-2">Blox Fruit</strong>
    </Link>
  )
}