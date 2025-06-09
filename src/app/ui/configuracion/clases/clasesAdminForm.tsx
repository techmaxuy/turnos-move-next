'use client';


import { Button } from '@/app/ui/configuracion/button';
import { verReservas, reservaState } from '@/app/lib/actions';
import { useActionState } from 'react';
import { useState } from 'react';


 export default function ClaseAdminForm(
   {initialData, customerId, diaSeleccionado}:
    {
      initialData:  Array<{ clase_id: string; nombre: string; dias: string[]; horas: string[] }>,
      customerId: string,
      diaSeleccionado: Date
    })

    {
  const initialState: reservaState = { message: null, errors: {} };
  const [state, formAction] = useActionState(verReservas, initialState);
  const [selectedValue, setSelectedValue] = useState('');
  const [datosDisponibles, setDatosDisponibles] = useState(initialData);
  const [claseSeleccionada, setClaseSeleccionada] = useState('');
  const [horaSeleccionada, setHoraSeleccionada] = useState('');

  
  return (
    <div className="my-4 w-full">      
        <div className="rounded-md bg-[#484848] p-2 md:p-6">
          {
            datosDisponibles.map((clase) => (
              clase.horas.map((hora) => {
                return (
                  <form action={formAction} key={clase.nombre+hora} >
                  <div className="flex flex-row rounded-lg border-2 border-[#01feab]  text-sm text-white font-semibold mb-2 p-2 items-center text-center justify-between">
                    <div className="hidden">
                      <input type="hidden" name="clase" value={clase.nombre} />
                    </div>
                    <div className="hidden">
                      <input type="hidden" name="hora" value={hora} />
                    </div>
                    <div className="hidden">
                      <input type="hidden" name="diaseleccionado" value={diaSeleccionado.toDateString()} />
                    </div>
                    <p>{clase.nombre} - {hora} hs.</p>
                      <Button type="submit">Ver reservas</Button>
                  </div>
                  <div aria-live="polite" aria-atomic="true">
                    {state.message ? (
                      <p className="mt-2 text-sm text-red-500">{state.message}</p>
                    ) : null}
                  </div>
                  </form>
                ); 
              })
            ))
          }
        </div>
    </div>
  );
}