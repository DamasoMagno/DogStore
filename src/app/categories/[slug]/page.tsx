"use client"
import { useParams } from "next/navigation";

import { Category } from "@/components/category";
import { Header } from "@/components/header"

export default function Categories() {
  const params = useParams() as { slug: string }

  return (
    <>
      <Header />

      <div className="flex flex-col gap-6 px-4 my-8 max-w-7xl mx-auto">
        <strong className="font-bold text-lg text-white uppercase">{params.slug}</strong>

        <div className="grid gap-4 mobile:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <Category key={index} />
          ))}
        </div>
      </div>
    </>
  );
}


