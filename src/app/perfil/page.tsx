//import {fetchLatestInvoices} from "@/app/lib/data";

export default async function Perfil() {
  //const latestInvoices = await fetchLatestInvoices();

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold">Pagina de Perfil de usuario</h1>
      <p className="text-lg">Este es un dato de mi perfil de usuario.</p>
    </div>
  );
}   