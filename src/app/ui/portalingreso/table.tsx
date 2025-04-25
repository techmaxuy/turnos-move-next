
import Image from 'next/image';
import { fetchFilteredCustomers } from '@/app/lib/data';


export default async function CustomerTable({
  query
}: {
  query: string;
}) {

  const customers = await fetchFilteredCustomers(query);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {customers?.map((invoice) => (
              <><p>{invoice.ci}</p></>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  CI
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Creditos
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {customers?.map((invoice) => (
                <><p>{invoice.ci}</p></>
               ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}