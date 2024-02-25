import Image from "next/image"
import Link from "next/link"

export function Product() {
  return (
    <Link
      href={`/product/Yama`}
      className="flex flex-col gap-2 max-w-[200px]"
    >
      <div className="bg-[#1A1A1A] rounded-md flex justify-center items-center min-h-[160px] h-full relative">
        <Image
          src="/Yama.png"
          width={0}
          height={0}
          sizes="100vw"
          alt=""
          className="w-full max-h-[100%] max-w-[70%] object-contain"
        />
      </div>

      <div>
        <p className="text-sm text-white font-normal">Yama</p>
        <strong className="text-white font-bold text-lg">R$ 25.00</strong>
      </div>
    </Link>
  )
}