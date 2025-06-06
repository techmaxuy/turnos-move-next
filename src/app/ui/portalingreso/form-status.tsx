'use client';

import { Button } from '@/app/ui/button';import { useActionState } from 'react';
import clsx from 'clsx';


export default function ReservaForm({creditos}: {creditos: number}) {

  return (
    <form >
      <div className={clsx("flex flex-col  items-center",{"hidden" : creditos <= 0})}>   
        <Button type="submit" className="mt-4 w-x-auto text-center text-xl h-14 w-x-auto" >
          Reservar
        </Button>
      </div>
      <div className={clsx({"hidden" : creditos > 0})}> 
        <p>
          No tienes creditos disponibles
          </p>  
          
      </div>
    </form>
  );
}