'use client';

import { CustomerForm } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/configuracion/button';
import { editarPerfil, clienteState } from '@/app/lib/actions';
import { useActionState } from 'react';


 export default function Form({
    customer
  }: {
    customer: CustomerForm;
  }) {
  const initialState: clienteState = { message: null, errors: {} };
  const editarClienteWithId = editarPerfil.bind(null, customer.id);
  const [clientestate, formAction] = useActionState(editarClienteWithId, initialState);


  return (
  <div className="p-2">
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
                className="peer w-full rounded-md border border-[#212121] bg-[#78bba5] py-[9px] pl-10 text-sm text-black placeholder:text-black"
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

          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                disabled
                required
                placeholder="Email"
                className="peer w-full rounded-md border border-[#212121] bg-[#78bba5] py-[9px] pl-10 text-sm text-black  placeholder:text-black"
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

        <label htmlFor="telefono" className="mb-2 block text-sm font-medium">
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
              className="peer w-full rounded-md border border-[#212121] bg-[#78bba5] py-[9px] pl-10 text-sm text-black  placeholder:text-black"
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

        <label htmlFor="ci" className="mb-2 block text-sm font-medium">
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
              className="peer w-full rounded-md border border-[#212121] bg-[#78bba5] py-[9px] pl-10 text-sm text-black  placeholder:text-black"
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
          href="/perfil"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Modificar</Button>
      </div>
    </form>
  </div>);
}