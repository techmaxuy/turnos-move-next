'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/configuracion/button';
import { crearClase, claseState } from '@/app/lib/actions';
import { useActionState } from 'react';
import { quicksand } from '@/app/ui/fonts';

 export default function Form() {
  const initialState: claseState = { message: null, errors: {} };
  const [state, formAction] = useActionState(crearClase, initialState);
  const dias = [{ id: 'lunes', name: 'Lunes'},
                      { id: 'martes', name: 'Martes'},
                      { id: 'miercoles', name: 'Miercoles'},
                      { id: 'jueves', name: 'Jueves'},
                        { id: 'viernes', name: 'Viernes'},
                        { id: 'sabado', name: 'Sabado'},
                        { id: 'domingo', name: 'Domingo'}
                    ];

  const horas = [{ id: '06', name: '06:00'},
    { id: '07', name: '07:00'},
    { id: '08', name: '08:00'},
    { id: '09', name: '09:00'},
    { id: '10', name: '10:00'},
    { id: '11', name: '11:00'}, 
    { id: '12', name: '12:00'},
    { id: '13', name: '13:00'},
    { id: '14', name: '14:00'},
    { id: '15', name: '15:00'},
    { id: '16', name: '16:00'},
    { id: '17', name: '17:00'},
    { id: '18', name: '18:00'},
    { id: '19', name: '19:00'},
    { id: '20', name: '20:00'},
    { id: '21', name: '21:00'},
    { id: '22', name: '22:00'},
    { id: '23', name: '23:00'},
];

  return (
    <div className={`${quicksand.className} border-2 border-solid border-[grey] text-2xl p-x-1 rounded-md bg-[#484848] p-4 m-6 md:p-6 md:mt-40`}>
      <form action={formAction}>
        
          {/* Nombre Clase */}
          <div className="mb-4">
            <label htmlFor="clase" className="mb-2 block text-sm font-semibold  font-medium">
              Nombre de la Clase
            </label>
            <div className="relative mt-2 rounded-md">
                <input
                  id="clase"
                  name="clase"
                  type="text"
                  placeholder="Ingresar un nombre para la clase"
                  className="peer block w-full rounded-md bg-[#757575] border border-[#757575] py-2 pl-10 text-sm outline-2 placeholder:text-white"
                  aria-describedby="clase-error"
                />
            </div>

            <div id="clase-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.clase &&
                state?.errors.clase.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* Dias */}
          <div className="mb-4 border border-solid border-[#757575] rounded-md p-4">
            <label htmlFor="dias" className="mb-2 block font-semibold text-sm font-medium">
              Dias
            </label>
            <div className="flex flex-wrap">      
                {dias.map((dia) => (
                  <div key={dia.id}  >
                      <input  aria-describedby='dias-error' type="checkbox" name="dias" value={dia.id}   /> 
                    <span className="mr-2 text-sm text-white">{dia.name}</span>  
                  </div>
                ))}            
            </div>
          </div>

        {/* Horas */}
          <div className="mb-4 border border-solid border-[#757575] rounded-md p-4">
            <label htmlFor="horas" className="mb-2 block text-sm font-medium font-semibold">
              Horas
            </label>
            <div  className="flex flex-wrap">        
                {horas.map((hora) => (
                  <div key={hora.id}>
                   
                  <input aria-describedby='horas-error' type="checkbox" name="horas" value={hora.id}  />
                   <label
                    className="flex-col items-center mr-4 mb-2 cursor-pointer"
                  >
                    <span className="mr-2 text-sm text-white">{hora.name}</span>  
                  </label>
                  </div>
                ))}           
            </div> 
          </div>

          <div aria-live="polite" aria-atomic="true">
            {state?.message ? (
              <p className="mt-2 text-sm text-red-500">{state.message}</p>
            ) : null}
          </div>
        
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/configuracion"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium font-semibold text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancelar
          </Link>
          <Button type="submit">Crear Clase</Button>
        </div>
      </form>
    </div>
 
  );
}