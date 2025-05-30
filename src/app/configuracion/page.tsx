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
   
      <div className="mx-2 mb-4 md:mt-15">
              <h1 className={`${quicksand.className} text-2xl p-x-1`}>Pagina de configuracion</h1>
            <div className="flex flex-row">
              <AgregarClase />
            </div>
            <Suspense key={query} fallback={<InvoicesTableSkeleton />}>
              <TableClases />
            </Suspense> 
            <div className="">
              {/* <Pagination totalPages={totalPages} /> */}
            </div>
          </div>
    );
  }  

  
  