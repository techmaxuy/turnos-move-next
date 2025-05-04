//import {fetchLatestInvoices} from "@/app/lib/data";
import { auth } from "../auth"
import NoAutenticado from "../ui/noAutenticado";

export default async function Configuracion() {
    //const latestInvoices = await fetchLatestInvoices();
    const session = await auth()
  if (!session) return <NoAutenticado />

    return (
      <div className="flex flex-col  items-center justify-center font-[family-name:var(--font-geist-sans)] ">
        <h1 className="text-2xl font-bold">Pagina de configuracion</h1>
        
      </div>
    );
  }  