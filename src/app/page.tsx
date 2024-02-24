import { Header } from "@/components/header"
import { Products } from "@/components/products";

export default function Home() {
  return (
    <>
      <Header />

      <div className="flex flex-col gap-6 px-4 my-8 max-w-7xl mx-auto">
        <section className="flex flex-col gap-5">
          <strong className="font-bold text-lg text-white uppercase">Gamepass</strong>
          <Products />
        </section>

        <section className="flex flex-col gap-5">
          <strong className="font-bold text-lg text-white uppercase">Contas</strong>
          <Products />
        </section>
      </div>
    </>
  );
}


