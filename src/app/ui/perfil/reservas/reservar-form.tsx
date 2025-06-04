'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/configuracion/button';
import { createReserva, reservaState } from '@/app/lib/actions';
import { useActionState } from 'react';
import { useState } from 'react';


 export default function ReservaForm(
   {initialData, customerId}:
    {
      initialData:  Array<{ clase_id: string; nombre: string; dias: string[]; horas: string[] }>,
      customerId: string
    })

    {
  const initialState: reservaState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createReserva, initialState);
  const [selectedValue, setSelectedValue] = useState('');
  const [datosDisponibles, setDatosDisponibles] = useState(initialData);
  const [claseSeleccionada, setClaseSeleccionada] = useState('');
  const [horaSeleccionada, setHoraSeleccionada] = useState('');

//  const [clasesDisponibles, setClasesDisponibles] = useState(initialClases);
 // const [horasDisponibles, setHorasDisponibles] = useState(initialHoras);


  const handleSelectChange = (event:any) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="my-4 w-full">      
      <form action={formAction}>
        <div className="hidden">
          <input type="hidden" name="customerId" value={customerId} />
        </div>
        <div className="rounded-md bg-[#484848] p-2 md:p-6">
          {
            datosDisponibles.map((clase) => (
              clase.horas.map((hora) => {
                return (
                  <div key={hora}  className="flex flex-row rounded-lg border-2 border-[#01feab]  text-sm text-white font-semibold mb-2 p-2 items-center text-center justify-between">
                    <div className="hidden">
                      <input type="hidden" name="clase" value={clase.nombre} />
                    </div>
                    <div className="hidden">
                      <input type="hidden" name="hora" value={hora} />
                    </div>
                    <p>{clase.nombre} - {hora} hs.</p>

                      <Button type="submit"> - Reservar - </Button>

                  </div>
                ); 
              })
            ))
          }

          <div aria-live="polite" aria-atomic="true">
            {state.message ? (
              <p className="mt-2 text-sm text-red-500">{state.message}</p>
            ) : null}
          </div>
        </div>
      </form>


    </div>
  );
}