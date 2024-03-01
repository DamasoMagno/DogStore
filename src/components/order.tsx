"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Download, Eye, EyeOff, Trash } from "lucide-react"
import { useState } from "react"
import { toast, Toaster } from "sonner"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"


export function Order() {
  const [passwordVisible, setPasswordVisible] = useState(false)

  const togglePasswordVisible = () => setPasswordVisible(state => !state)

  return (
    <Accordion
      type="multiple"
      className="border-[#2A2A2A] border-2 rounded-md px-4"
    >
      <AccordionItem value="item-1" className="border-0">
        <AccordionTrigger className="text-white hover:no-underline">
          <div className="flex flex-col gap-1 items-start">
            <span>Numero do Pedido</span>
            <strong className="text-[#A1A1A1]">#001</strong>
          </div>
          <div className="flex flex-col gap-1 items-start">
            <span>Status</span>
            <strong className="text-[#A61C1C]">Pago</strong>
          </div>
          <div className="flex flex-col items-start gap-1">
            <span>Data Pagamento</span>
            <strong className="text-[#A61C1C]">24/02/2024</strong>
          </div>
        </AccordionTrigger>

        <AccordionContent>
          <div className="flex items-center justify-between border-t-[#2A2A2A]/25 border-t-2">
            <span className="text-white">Filtrar</span>

            <Select>
              <SelectTrigger className="flex items-center gap-2 my-2 text-white w-auto bg-transparent outline-none border-none focus-visible:border-none focus:ring-offset-0 focus:ring-0">
                Todas as contas
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="GodHuman">GodHuman</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ul className="text-white flex flex-col gap-2 border-y-[#2A2A2A]/25 border-y-2 py-4">
            <li>
              <span className="text-[#A1A1A1] text-sm">Usuário</span>
              <p>Godhuman V4</p>
            </li>

            <li className="border-y-[#2A2A2A]/15 border-y-[1px] py-4">
              <span className="text-[#A1A1A1] text-sm">Login</span>
              <p>godhumanv4@gmail.com</p>
            </li>

            <li>
              <span className="text-[#A1A1A1] text-sm">Senha</span>
              <div className="flex items-center gap-4">
                <p className="flex-1">{!passwordVisible ? "************" : "Hello"}</p>

                <button className="flex items-center justify-center" onClick={togglePasswordVisible}>
                  {!passwordVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
              </div>
            </li>
          </ul>

          <div className="flex items-center justify-between py-1">
            <span className="text-white">Baixar contas</span>
            <Button variant="ghost" className="flex items-center gap-2 text-[#A61C1C] hover:bg-transparent hover:text-[#A61C1C] self-end" onClick={() => toast.success("Contas baixadas")}>
              <Download size={14} />
              Baixar contas
            </Button>
          </div>

          <div className="flex items-center justify-between border-t-[#2A2A2A]/25 border-t-2 py-1">
            <span className="text-white">Arquivar</span>
            <Button variant="ghost" className="flex items-center gap-2 text-[#A61C1C] hover:bg-transparent hover:text-[#A61C1C] self-end" onClick={() => toast.success("Contas arquivas")}>
              <Trash size={14} />
              Arquivar
            </Button>
          </div>

          <footer className="text-white flex items-center justify-between py-4 border-t-[#2A2A2A]/25 border-t-2">
            <p>Total</p>
            <strong>R$ 1220,93</strong>
          </footer>
        </AccordionContent>
      </AccordionItem>

      <Toaster
        position="top-right"
      />
    </Accordion>
  )
}