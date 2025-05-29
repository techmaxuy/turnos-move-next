'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/configuracion/button';
import { createReserva, reservaState } from '@/app/lib/actions';
import { useActionState } from 'react';
import { useState } from 'react';
import { promises } from 'dns';

 export default function ReservaForm( {clases, horas}:{clases:  Array<{ id: string; name: string }>,horas:  Array<{ id: string; name: string }>}  ) {
  const initialState: reservaState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createReserva, initialState);
  const [selectedValue, setSelectedValue] = useState('');
  const handleSelectChange = (event:any) => {
    setSelectedValue(event.target.value);
  };

  return (
    <form action={formAction}>
      <div className="rounded-md bg-[#484848] p-4 md:p-6">

        {/* Clase */}
        <div className="mb-4">
          <label htmlFor="clase" className="mb-2 block text-sm font-medium">
           Clase
          </label>
          <div className="relative">
            <select
              id="clase"
              name="clase"
              className="peer block w-full cursor-pointer rounded-md bg-[#757575] border border-[#757575] py-2 pl-10 text-sm outline-2 placeholder:text-black"
              aria-describedby="clase-error"
              onChange={handleSelectChange}
              value={selectedValue}
            >
              <option className="text-black" value="" disabled>
                Seleccionar clase a reservar
              </option>
              {clases.map((clase) => (
                <option  key={clase.id} value={clase.id}>
                  {clase.name}
                </option>
              ))}
            </select>
          </div>

          <div id="clase-error" aria-live="polite" aria-atomic="true">
            {state.errors?.clase &&
              state.errors.clase.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Hora */}
        <div className="mb-4">
          <label htmlFor="hora" className="mb-2 block text-sm font-medium">
           Hora
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
                <select
                id="hora"
                name="hora"
                className="peer block w-full cursor-pointer rounded-md bg-[#757575] border border-[#757575] py-2 pl-10 text-sm outline-2 placeholder:text-black"
                defaultValue=""
                aria-describedby="hora-error"
                >
                <option className="text-black" value="" disabled>
                    Seleccionar hora a reservar
                </option>
                {horas.map((hora) => (
                    <option  key={hora.id} value={hora.id}>
                    {hora.name}
                    </option>
                ))}
                </select>
            </div>
          </div>

          <div id="hora-error" aria-live="polite" aria-atomic="true">
            {state.errors?.hora &&
              state.errors.hora.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>


        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/perfil/misreservas"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Reservar</Button>
      </div>
    </form>
  );
}