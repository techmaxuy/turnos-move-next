import clsx from 'clsx';
import { fetchCustomers } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { Suspense } from 'react';

export default async function FormIngreso() {
  const customers = await fetchCustomers();

  return (
    <div className="flex flex-col w-full rounded-xl bg-[#568072] p-4 md:pt-0 mt-2 ">
        <h2 className={`${lusitana.className} text-xl p-4 text-center`}>
       Identificacion (CI , DNI)
        </h2>
        <div className="flex flex-col items-center pb-2 pt-6">
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="identificacion..." />
                
            </div>
            {/*  <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense> */}
            <div className="mt-5 flex w-full justify-center">
            {/* <Pagination totalPages={totalPages} /> */}
            </div>
            <div>
                <h3 className="ml-2 text-sm text-white ">Actualizado justo ahora</h3>
            </div>
        </div>
    </div>
  );
}