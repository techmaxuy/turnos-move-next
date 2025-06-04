//import {fetchLatestInvoices} from "@/app/lib/data";
import TableClases from "@/app/ui/configuracion/clases";
import { AgregarClase } from "@/app/ui/configuracion/buttons";
import { auth } from "../auth"
import NoAutenticado from "../ui/noAutenticado";
import { quicksand } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';

export default async function Configuracion(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
    //const latestInvoices = await fetchLatestInvoices();
    const session = await auth()
  if (!session) return <NoAutenticado />

    const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  

    return (
   
      <div className={`${quicksand.className} text-2xl p-x-1 rounded border-2 border-solid  border-[grey] bg-[#212121] align-center m-6 p-6 md:mt-40`}>
              <p className="text-2xl p-x-1">Pagina de configuracion</p>

            <Suspense key={query} fallback={<InvoicesTableSkeleton />}>
              <TableClases />
            </Suspense> 
            <div className="flex justify-end mt-4">
              <AgregarClase />
            </div>
      </div>
    );
  }  

  
  