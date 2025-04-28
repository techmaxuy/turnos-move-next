import clsx from 'clsx';
import Image from 'next/image';
import { fetchFilteredCustomers } from '@/app/lib/data';


export default async function CustomerTable({
  query
}: {
  query: string;
}) {

  const customers = await fetchFilteredCustomers(query);

  return (
    <div className="flex flex-col w-full rounded-xl bg-[#568072] p-4 md:pt-0 mt-2 min-h-120">
          <div className="flex flex-col justify-between py-2 text-center text-sm font-medium text-black bg-[#212121] rounded-lg min-h-100 place-items-center">
            {customers?.map((invoice) => (
              <>
                <div className={clsx("py-10 my-5 text-white",{"hidden" : !(invoice.name)})}>
                    <div className="text-2xl">Bienvenido !! </div>
                    <div className="text-4xl ">{invoice.name}</div>
                    <div className="border border-white rounded-lg p-4 mt-4 text-lg">
                      <div className="py-2">Creditos disponibles:   <strong>{invoice.creditos}</strong></div>
                    </div>                 
                </div>
              </>
            ))}
              <div className={clsx("py-10 my-5 mx-5 text-white place-items-center",{"hidden" : customers.length > 0})}>
                <div className="text-2xl">Bienvenido !! </div>
                <div className="text-4xl ">Ingrese su numero de CI para registrar su ingreso</div>
                <div className="border border-white rounded-lg p-4 mt-4 text-lg max-w-2/3">
                  <div className="py-2">Creditos disponibles:   <strong>...</strong></div>
                </div>                 
              </div>  
          </div>
    </div>
  );
}