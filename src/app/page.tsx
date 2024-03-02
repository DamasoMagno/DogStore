import { Games } from "@/components/games";
import { Header } from "@/components/header"
import { Products } from "@/components/products";
import { popularProducts } from "@/graphql/queries/popular-products";

export default async function Home() {
  const { categories, jogos } = await popularProducts()

  return (
    <div className="flex flex-col gap-8 px-4 my-8 max-w-7xl mx-auto">
      {categories.map(category => (
        <section
          key={category.id}
          className="flex flex-col gap-5"
        >
          <strong className="font-bold text-lg text-white uppercase">{category.name}</strong>
          <Products products={category.product} />
        </section>
      ))}

      <section>
        <strong className="font-bold text-lg text-white uppercase">Jogos recomendados</strong>
        <Games games={jogos} />
      </section>
    </div>
  );
}


