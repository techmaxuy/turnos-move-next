//import {fetchLatestInvoices} from "@/app/lib/data";
import UserAvatar from "../ui/UserAvatar";

export default async function Perfil() {
  //const latestInvoices = await fetchLatestInvoices();

  return (
    <div className="flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold">Pagina de Perfil de usuario</h1>
      <p className="text-lg">Este es un dato de mi perfil de usuario.</p>
      <UserAvatar />
    </div>
  );
}   