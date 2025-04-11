import clsx from 'clsx';
import { fetchLatestInvoices } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';

export default async function LatestPagos() {
  const latestInvoices = await fetchLatestInvoices();

  return (
    <div className="flex flex-col w-full justify-between rounded-xl bg-[#568072] p-4 md:pt-0 mt-2">
      <h2 className={`${lusitana.className} text-xl px-1`}>
        Ultimos pagos
      </h2>
      <div className="">
        <div className="">
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  'flex flex-row w-full items-center justify-between py-2 text-sm font-medium text-black',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
              <div className="flex items-center">
                <div className="">
                    {invoice.name}
                </div>
                <div className=""> 
                    {invoice.date}
                </div>
                <div className="">
                    {invoice.amount}
                </div>
              </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <h3 className="ml-2 text-sm text-white ">Actualizado justo ahora</h3>
        </div>
      </div>
    </div>
  );
}

//flex w-full flex-col md:col-span-4
//flex grow flex-col justify-between rounded-xl bg-[#568072]  p-4
//bg-[#818181] px-6
//