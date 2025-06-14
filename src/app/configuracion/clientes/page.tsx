
import Search from '@/app/ui/configuracion/search';
import Table from '@/app/ui/configuracion/clientes/table';
import { AgregarCliente } from '@/app/ui/configuracion/clientes/buttons';
import { quicksand } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { auth } from "../../auth"
import NoAutenticado from "../../ui/noAutenticado";
 
export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {

  const session = await auth()

 if (!session) return <NoAutenticado />

  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  

  return (
    <div className="mx-2 mb-4 md:mt-15">
        <h1 className={`${quicksand.className} text-2xl p-x-1`}>Clientes</h1>
      <div className="flex flex-row">
        <Suspense fallback={<InvoicesTableSkeleton />}>
          <Search placeholder="Buscar clientes..." />
        </Suspense>
        <AgregarCliente />
      </div>
      <Suspense key={query} fallback={<InvoicesTableSkeleton />}>
        <Table />
      </Suspense> 
      <div className="">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}


//w-full
//flex w-full items-center justify-between
//mt-4 flex items-center justify-between gap-2 md:mt-8
//mt-5 flex w-full justify-center