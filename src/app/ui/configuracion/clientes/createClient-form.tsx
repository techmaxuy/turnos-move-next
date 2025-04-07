'use client';

import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/configuracion/button';
import { createCliente, clienteState } from '@/app/lib/actions';
import { useActionState } from 'react';

 export default function Form() {
  const initialState: clienteState = { message: null, errors: {} };
  const [clientestate, formAction] = useActionState(createCliente, initialState);

  console.log('clientestate', clientestate);


  return (
  <>
    <form action={formAction}>
        {/* Nombre completo del cliente */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Nombre Completo
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                placeholder="Nombre Completo"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="nombre-error"
              />
            </div>
          </div>

          <div id="nombre-error" aria-live="polite" aria-atomic="true">
            {clientestate.errors?.nombre &&
              clientestate.errors.nombre.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Email */}
        <div className="mb-4"> 

          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="email-error"
              />
            </div>
          </div>

          <div id="email-error" aria-live="polite" aria-atomic="true">
            {clientestate.errors?.email &&
              clientestate.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/configuracion/clientes"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Crear cliente</Button>
      </div>
    </form>
  </>);
}