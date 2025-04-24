export const dynamic = 'force-dynamic';


import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { Suspense } from 'react';
import Table from '@/app/ui/portalingreso/table';
import { CustomerPortalIngresoTableSkeleton } from '@/app/ui/skeletons';

export default async function FormIngreso(props: {
    searchParams?: Promise<{
      query?: string;
    }>;
  }) {

    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    console.log(query)

  return (
    <div className="flex flex-col w-full rounded-xl bg-[#568072] p-4 md:pt-0 mt-2 ">
        <h2 className={`${lusitana.className} text-xl p-4 text-center`}>
       Identificacion (CI , DNI)
        </h2>
        <div className="flex flex-col items-center pb-2 pt-6">
            <Suspense fallback={<CustomerPortalIngresoTableSkeleton />}>
                <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                    <Search placeholder="identificacion..." />
                </div>
                <Table query={query}/>
            </Suspense>

            <div className="mt-5 flex w-full justify-center">
            {/* <Pagination totalPages={totalPages} /> */}
            </div>
            <div>
                <h3 className="ml-2 text-sm text-white ">Actualizado justo ahora {query}</h3>
            </div>
        </div>
    </div>
  );
}