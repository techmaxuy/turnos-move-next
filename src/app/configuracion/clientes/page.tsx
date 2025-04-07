
import Pagination from '@/app/ui/configuracion/clientes/pagination';
import Search from '@/app/ui/configuracion/search';
import Table from '@/app/ui/configuracion/clientes/table';
import { AgregarUsuario } from '@/app/ui/configuracion/clientes/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
 
export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;


  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Clientes</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Suspense fallback={<InvoicesTableSkeleton />}>
          <Search placeholder="Buscar clientes..." />
        </Suspense>
        <AgregarUsuario />
      </div>
      {  <Suspense key={query} fallback={<InvoicesTableSkeleton />}>
        <Table />
      </Suspense> }
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}