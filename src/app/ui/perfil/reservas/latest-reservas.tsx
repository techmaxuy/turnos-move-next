import clsx from 'clsx';
import { fetchLatestReservas } from '@/app/lib/data';

export default async function LatestReservas( { customerId }: { customerId: string }) {
  const latestReservas = await fetchLatestReservas(customerId);

  return (
    <div >
        {latestReservas.map((reserva, i) => {
          return (
            <div
              key={reserva.id}
              className={clsx(
                'flex flex-row justify-between p-2 text-sm font-medium text-white font-semibold rounded-lg border-2 border-solid  border-[#01feab] my-2',
                {
                  'border-t': i !== 0,
                },
              )}
            >
              <div>
                {reserva.fechareserva}
              </div>
              <div>
                {reserva.clase_id}
              </div>
              <div> 
                {reserva.hora} hs.
              </div>
            </div>
          );
        })}
    </div>
  );
}