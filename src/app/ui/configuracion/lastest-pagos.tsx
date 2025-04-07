import clsx from 'clsx';
import { fetchLatestInvoices } from '@/app/lib/data';


export default async function LatestPagos() {
  const latestInvoices = await fetchLatestInvoices();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`mb-4 text-xl md:text-2xl`}>
        Ultimos pagos
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-[#00885b]  p-4">
        <div className="bg-[#212121] px-6">
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {invoice.name}
                    </p>
                    </div>
                  <div className="ml-2 hidden sm:block"> 
                    <p className="text-sm text-white sm:block">
                      {invoice.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <p className={`truncate text-sm font-medium md:text-base`}>
                    {invoice.amount}
                    </p>
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