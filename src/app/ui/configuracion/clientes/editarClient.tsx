'use client';

import { CustomerForm } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/configuracion/button';
import { editarCliente, clienteState } from '@/app/lib/actions';
import { useActionState } from 'react';
import { quicksand } from '@/app/ui/fonts';

 export default function Form({
    customer
  }: {
    customer: CustomerForm;
  }) {
  const initialState: clienteState = { message: null, errors: {} };
  const editarClienteWithId = editarCliente.bind(null, customer.id);
  const [clientestate, formAction] = useActionState(editarClienteWithId, initialState);


  return (
  <div className={`${quicksand.className} border-2 border-solid border-[grey] text-2xl p-x-1 rounded-md bg-[#484848] p-4 m-6 md:p-6 md:mt-40`}>
    <form action={formAction}>
        {/* Nombre completo del cliente */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium font-semibold">       
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
                className="peer block w-full rounded-md bg-[#757575] border border-[#757575] py-2 pl-10 text-sm outline-2 placeholder:text-white"
                aria-describedby="nombre-error"
                defaultValue={customer.name}
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

          <label htmlFor="email" className="mb-2 block text-sm font-medium font-semibold">
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
                className="peer block w-full rounded-md bg-[#757575] border border-[#757575] py-2 pl-10 text-sm outline-2 placeholder:text-white"
                aria-describedby="email-error"
                defaultValue={customer.email}
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

                {/* Telefono*/}
                <div className="mb-4"> 

        <label htmlFor="telefono" className="mb-2 block text-sm font-medium font-semibold">
          Telefono
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="telefono"
              name="telefono"
              type="number"
              required
              placeholder="Telefono"
              className="peer block w-full rounded-md bg-[#757575] border border-[#757575] py-2 pl-10 text-sm outline-2 placeholder:text-white"
              aria-describedby="telefono-error"
              defaultValue={customer.telefono}
            />
          </div>
        </div>

        <div id="telefono-error" aria-live="polite" aria-atomic="true">
          {clientestate.errors?.telefono &&
            clientestate.errors.telefono.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
        </div>

                                {/* CI*/}
                                <div className="mb-4"> 

        <label htmlFor="ci" className="mb-2 block text-sm font-medium font-semibold">
          CI
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="ci"
              name="ci"
              type="number"
              required
              placeholder="Cedula de Identidad"
              className="peer block w-full rounded-md bg-[#757575] border border-[#757575] py-2 pl-10 text-sm outline-2 placeholder:text-white"
              aria-describedby="ci-error"
              defaultValue={customer.ci}
            />
          </div>
        </div>

        <div id="ci-error" aria-live="polite" aria-atomic="true">
          {clientestate.errors?.ci &&
            clientestate.errors.ci.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
        </div>
      
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/configuracion/clientes"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium font-semibold text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Modificar</Button>
      </div>
    </form>
  </div>
  );
}