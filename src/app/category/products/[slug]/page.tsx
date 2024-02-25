import { Header } from "@/components/header"
import { Product } from "@/components/product";

export default function Products() {
  return (
    <>
      <Header />

      <div className="flex flex-col gap-6 px-4 my-8 max-w-7xl mx-auto">
        <strong className="font-bold text-lg text-white uppercase">Gamepass</strong>

        <div className="grid gap-4 grid-cols-2 mobile:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <Product key={index} />
          ))}
        </div>
      </div>
    </>
  );
}


