"use client"
import Image from "next/image"
import { Menu, Router, Search, User, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Cart } from "../cart";

export function Header() {
  const route = useRouter()
  const [input, setInput] = useState("")

  const [searchBarVisible, setSearchBarVisible] = useState<boolean>(false)

  const handleOpenSearchBar = () => {
    setSearchBarVisible(state => !state)
  }

  return (
    <header className="border-b-[2px] border-[#2A2A2A]/25">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between py-4 px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-white"
        >
          <Image
            src="/logo.png"
            alt=""
            width={30}
            height={30}
          />
          <h3 className="hidden md:block font-bold">Dog Store</h3>
        </Link>

        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-white">
                <Menu />
              </button>
            </PopoverTrigger>

            <PopoverContent className="bg-[#1A1A1A] border-0 w-auto px-0 py-0">
              <nav className="flex flex-col w-full">
                <Link href="/games/gamepass" className="text-white text-base border-b-[1px] border-white/10 px-8 py-4">Gamepass</Link>
                <Link href="/games/account" className="text-white text-base px-8 py-4">Contas</Link>
              </nav>
            </PopoverContent>
          </Popover>


          <div className="bg-[#1A1A1A]/25 border-[2px] border-[#1A1A1A]/50 rounded-sm flex px-4 py-2 gap-2 relative">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                route.push(`/products/${input}`)
                setInput("")
              }}
              className={`
              ${searchBarVisible ? "fixed w-64 left-1/2 -translate-x-1/2 bg-[#1A1A1A]/100 border-[2px] border-[#181717] p-2 rounded-md gap-4" : "hidden"}
                md:relative md:flex flex items-center bg-[#1A1A1A] w-full md:bg-transparent
            `}>
              <input
                onChange={e => setInput(e.target.value)}
                value={input}
                placeholder="buscar"
                className={`
                ${searchBarVisible ? "block" : "hidden"}
                  md:flex bg-transparent text-white outline-none flex-1
              `}
              />
              <button
                type="button"
                className="flex items-center justify-center md:hidden" onClick={handleOpenSearchBar}>
                <X size={16} color="#FFF" />
              </button>
            </form>

            <button
              type="button"
              className="flex justify-center items-center text-white"
              onClick={handleOpenSearchBar}
            >
              <Search size={14} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/profile" className="bg-transparent flex justify-center items-center text-white border-[#2A2A2A] border-2 rounded-lg w-9 h-9">
            <User className="text-white" size={14} />
          </Link>
          <Cart />
        </div>
      </div>
    </header >
  )
}