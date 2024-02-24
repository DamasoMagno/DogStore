"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"


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
          Numero do Pedido
        </AccordionTrigger>
        <AccordionContent>
          <ul className="text-white flex flex-col gap-4 border-y-[#2A2A2A] border-y-2 py-4">
            <li>
              <span className="text-[#A1A1A1] text-sm">Usuário</span>
              <p>Godhuman V4</p>
            </li>

            <li>
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

          <footer className="text-white flex items-center justify-between py-4">
            <p>Total</p>
            <strong>R$ 1220,93</strong>
          </footer>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}