//import {fetchLatestInvoices} from "@/app/lib/data";
import { auth } from "../auth"

export default async function Configuracion() {
    //const latestInvoices = await fetchLatestInvoices();
    const session = await auth()
  if (!session) return <div>Not authenticated</div>
  
    return (
      <div className="flex flex-col  items-center justify-center font-[family-name:var(--font-geist-sans)] ">
        <h1 className="text-2xl font-bold">Pagina de configuracion</h1>
        
      </div>
    );
  }  