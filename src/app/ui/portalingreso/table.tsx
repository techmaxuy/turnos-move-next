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
          <div className="flex flex-col justify-between py-2 text-center text-sm font-medium text-black bg-white rounded-lg min-h-100 place-items-center">
            {customers?.map((invoice) => (
              <>
                <p 
                  className={clsx(
                  "py-10 my-5",{"hidden" : !(invoice.name)}
                  )}>
                    <p className="text-2xl">Bienvenido !! </p>
                    <p className="text-4xl ">{invoice.name}</p>
                    <p>{invoice.creditos}</p>
                    
                </p>
                
              </>
            ))}
          </div>
    </div>
  );
}