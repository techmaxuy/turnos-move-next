'use client'

import clsx from 'clsx';
import type { LatestReservas } from '@/app/lib/definitions';
import { eliminarReserva, eliminarReservaState } from '@/app/lib/actions';
import { useActionState } from 'react';
import { Button } from '@/app/ui/configuracion/button';

export default function misReservasForm( { latestReservas,customerId }: {  latestReservas: LatestReservas[] , customerId: string }) {

  const initialState: eliminarReservaState = { message: null, errors: {} };
  const [state, formAction] = useActionState(eliminarReserva, initialState);

  return (
    <div >
        {latestReservas.map((reserva, i) => {
          return (
            <form action={formAction} key={reserva.id} >
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
                  {reserva.hora.toString().length > 2 ? reserva.hora.toString().slice(0,2)+":"+reserva.hora.toString().slice(2,4) : reserva.hora} hs.
                </div>
                <div className="hidden">
                  <input type="hidden" name="reservaId" value={reserva.id} />
                </div>
                <div className="hidden">
                  <input type="hidden" name="customerId" value={customerId} />
                </div>
                <div>
                  <Button type="submit">Borrar</Button>
                </div>

              </div>
            </form>
          );
        })}
    </div>
  );
}


/*                <div aria-live="polite" aria-atomic="true">
                    {state.message ? (
                      <p className="mt-2 text-sm text-red-500">{state.message}</p>
                    ) : null}
                </div>

                */