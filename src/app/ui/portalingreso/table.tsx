
import Image from 'next/image';
import { fetchFilteredCustomers } from '@/app/lib/data';


export default async function CustomerTable({
  query
}: {
  query: string;
}) {

  const customers = await fetchFilteredCustomers(query);

  return (
    <div className="flex flex-col w-full rounded-xl bg-[#568072] p-4 md:pt-0 mt-2 ">
          <div className="flex flex-col justify-between py-2 text-center text-sm font-medium text-black bg-white rounded-lg">
            {customers?.map((invoice) => (
              <>
                <p>{invoice.name}</p>
                <p>{invoice.ci}</p>
                <p>{invoice.creditos}</p>
              </>
            ))}
          </div>
    </div>
  );
}