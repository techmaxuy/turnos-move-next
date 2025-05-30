import clsx from 'clsx';
import { fetchLatestReservas } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';

export default async function LatestReservas( { customerId }: { customerId: string }) {
  const latestReservas = await fetchLatestReservas(customerId);

  return (
    <div className="flex flex-col w-full rounded-xl bg-[#568072] p-4 md:pt-0 mt-2 ">
      <h2 className={`${lusitana.className} text-xl p-4`}>
        Mis ultimas reservas
      </h2>
          <div className="">
            {latestReservas.map((reserva, i) => {
              return (
                  <div
                    key={reserva.id}
                    className={clsx(
                      'flex flex-row justify-between py-2 text-sm font-medium text-black bg-white rounded-lg',
                      {
                        'border-t': i !== 0,
                      },
                    )}
                  >
                      <div className="ml-4">
                      {reserva.clase_id}
                        
                      </div>
                      <div className=""> 
                      {reserva.hora}
                      </div>
                      <div className="mr-4">
                      {reserva.utilizada}
                      </div>
                  </div>
              );
            })}
          </div>
          <div className="flex items-center pb-2 pt-6">
            <h3 className="ml-2 text-sm text-white ">Actualizado justo ahora</h3>
          </div>
    </div>
  );
}