import { Header } from "@/components/header";
import { Order } from "@/components/order";

export default function Profile() {
  return (
    <>
      <Header />

      <main className="flex flex-col gap-6 px-4 my-8 max-w-7xl mx-auto">
        <strong className="font-bold text-lg text-white uppercase">Minhas contas</strong>

        <Order />
      </main>
    </>
  );
}