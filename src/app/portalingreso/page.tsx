
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { Suspense } from 'react';
import CustomerTable from '@/app/ui/portalingreso/table';
import { CustomerPortalIngresoTableSkeleton } from '@/app/ui/skeletons';


export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {

  const searchParams = await props.searchParams;
    const query = searchParams?.query || '';

  return (
    <div className="mx-2 mb-4 md:mt-15">
      <h1 className={`${lusitana.className} text-2xl px-1 py-2 text-center`}>Portal de Ingreso</h1>
        <div className="flex flex-col w-full rounded-xl bg-[#568072] p-4 md:pt-0 mt-2 ">
                <div className="flex flex-col items-center pb-2 pt-6">
                    <Suspense fallback={null}>
                        <div className="flex items-center w-1/3 justify-between gap-2 md:mt-8">
                          <label className="text-sm text-white">CI</label>
                            <Search placeholder="identificacion..." />
                        </div>
                    </Suspense>
                    <CustomerTable query={query}/>
                    <div>
                        <h3 className="ml-2 text-sm text-white ">Actualizado justo ahora</h3>
                    </div>
                </div>
            </div>
    </div>
  );
}  