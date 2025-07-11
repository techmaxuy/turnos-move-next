
import { quicksand } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { Suspense } from 'react';
import CustomerTable from '@/app/ui/portalingreso/table';
import Link from 'next/link';
import Image from "next/image";
import { auth } from "../auth"
import NoAutenticado from "../ui/noAutenticado";


export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {


  const session = await auth()
  if (!session) return <NoAutenticado />

  const searchParams = await props.searchParams;
    const query = searchParams?.query || '';

  return (
    <div className={`${quicksand.className} mx-2 mb-4 md:mt-15 place-items-center`} >
          <Link
            className=""
              href="/perfil"
          > 
            <Image
              className="min-h-[100px] min-w-[100px]"
              src="/logonuevo.svg"
              alt="Move logo"
              width={100}
              height={100}
              priority
            />
          </Link>
        <div className="flex flex-col w-full rounded-xl bg-[#568072] p-4 md:pt-0 mt-2 ">
                <div className="flex flex-col items-center pb-2 pt-6">
                    <Suspense fallback={null}>
                        <div className="flex items-center w-2/3 justify-between gap-2 md:mt-8 placeholder:font-semibold ">
                            <Search placeholder="CEDULA DE IDENTIDAD..." />
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