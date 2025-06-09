'use client';

import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import { createReservaYcompleto, reservaState } from '@/app/lib/actions';
import clsx from 'clsx';


export default function ReservaForm({creditos}: {creditos: number}) {

  const initialState: reservaState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createReservaYcompleto, initialState);
  const today = new Date();

  return (
    <form action={formAction}>
      <div className="flex flex-col items-center">
        {today.toString()}
      </div>
      <div className={clsx("flex flex-col  items-center",{"hidden" : creditos <= 0})}>
          <div>
            <Button type="submit" className="mt-4 w-x-auto text-center text-xl h-14 w-x-auto" >
              Reservar
            </Button>    
          </div>
      </div>
      <div className={clsx({"hidden" : creditos > 0})}> 
        <p>
          No tienes creditos disponibles
        </p>  
      </div>
    </form>
  );
}