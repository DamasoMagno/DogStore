import { Order } from "@/components/order";
import Head from "next/head";

export default function Profile() {
  return (
    <>
      <Head>
        <title>Dog Store | Meu Perfil</title>
      </Head>

      <main className="flex flex-col gap-6 px-4 my-8 max-w-7xl mx-auto">
        <strong className="font-bold text-lg text-white uppercase">Minhas contas</strong>

        <Order />
      </main>
    </>
  );
}