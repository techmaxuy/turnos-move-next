
import CustomersTable from '@/app/ui/configuracion/clientes/table';
import { AgregarCliente } from '@/app/ui/buttons';
import { quicksand } from '@/app/ui/fonts';
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
    <div className={`${quicksand.className} text-2xl p-x-1 rounded border-2 border-solid  border-[grey] bg-[#212121] align-center m-6 p-6 md:mt-40`}>
      <p className="text-2xl p-x-1">Clientes</p>
      <CustomersTable />
      <div className="flex justify-end mt-4">
        <AgregarCliente />
      </div>
    </div>
  );
}
