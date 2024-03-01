"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { ShoppingCart } from "lucide-react"
import { IProduct } from "@/interfaces"


export function ProductSkeleton() {
  return (
    <div className="flex flex-col gap-2 max-w-[200px] animate-pulse">
      <div className="flex flex-col gap-2 max-w-[200px]">
        <div className="bg-[#1A1A1A] rounded-md flex justify-center items-center min-h-[140px] h-full relative">
          <div className="w-full h-[160px] bg-white/5" />
        </div>

        <p className="text-sm text-white font-normal rounded-md bg-white/5 h-6" />
      </div>

      <div className="flex items-center gap-4 justify-between">
        <strong className="bg-white/5 h-full w-full rounded-md" />
        <Button className="w-8 h-8 bg-white/5" />
      </div>
    </div>
  )
}