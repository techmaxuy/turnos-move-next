'use client';

import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/configuracion/button';
import { createInvoice, State } from '@/app/lib/actions';
import { useActionState } from 'react';

 export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);
  const formaPago = [{ id: 'efectivo', name: 'Efectivo'},
                      { id: 'transferencia', name: 'Transferencia'},
                      { id: 'credito', name: 'Tarjeta de credito'}];

  const servicio = [{ id: '24', name: '24 clases'},
    { id: '12', name: '12 clases'}];

  return (
    <form action={formAction}>
      <div className="rounded-md bg-[#484848] p-4 md:p-6">

        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Elegir cliente
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md bg-[#757575] border border-[#757575] py-2 pl-10 text-sm outline-2 placeholder:text-black"
              defaultValue=""
              aria-describedby="customer-error"
            >
              <option className="text-black" value="" disabled>
                Seleccionar cliente
              </option>
              {customers.map((customer) => (
                <option  key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId &&
              state.errors.customerId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Servicio */}
        <div className="mb-4">
          <label htmlFor="servicio" className="mb-2 block text-sm font-medium">
           Tipo de Servicio
          </label>
          <div className="relative">
            <select
              id="servicio"
              name="servicioId"
              className="peer block w-full cursor-pointer rounded-md bg-[#757575] border border-[#757575] py-2 pl-10 text-sm outline-2 placeholder:text-black"
              defaultValue=""
              aria-describedby="servicio-error"
            >
              <option className="text-black" value="" disabled>
                Seleccionar tipo de servicio
              </option>
              {servicio.map((formaPa) => (
                <option  key={formaPa.id} value={formaPa.id}>
                  {formaPa.name}
                </option>
              ))}
            </select>
          </div>

          <div id="servicio-error" aria-live="polite" aria-atomic="true">
            {state.errors?.servicioId &&
              state.errors.servicioId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Monto
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md bg-[#757575] border border-[#757575] py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
              />
            </div>
          </div>

          <div id="amount-error" aria-live="polite" aria-atomic="true">
            {state.errors?.amount &&
              state.errors.amount.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Tipo */}
        <div className="mb-4">
          <label htmlFor="formaPago" className="mb-2 block text-sm font-medium">
           Forma de pago
          </label>
          <div className="relative">
            <select
              id="formaPago"
              name="formaPagoId"
              className="peer block w-full cursor-pointer rounded-md bg-[#757575] border border-[#757575] py-2 pl-10 text-sm outline-2 placeholder:text-black"
              defaultValue=""
              aria-describedby="formaPago-error"
            >
              <option className="text-black" value="" disabled>
                Seleccionar forma de pago
              </option>
              {formaPago.map((formaPa) => (
                <option  key={formaPa.id} value={formaPa.id}>
                  {formaPa.name}
                </option>
              ))}
            </select>
          </div>

          <div id="formaPago-error" aria-live="polite" aria-atomic="true">
            {state.errors?.formaPagoId &&
              state.errors.formaPagoId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

         {/* transaccion */}
         <div className="mb-4">
          <label htmlFor="transaccion" className="mb-2 block text-sm font-medium">
            Nº de transaccion
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="transaccion"
                name="transaccion"
                type="text"
                placeholder="Ingresar un transaccion"
                className="peer block w-full rounded-md bg-[#757575] border border-[#757575] py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="transaccion-error"
              />
            </div>
          </div>

          <div id="transaccion-error" aria-live="polite" aria-atomic="true">
            {state.errors?.transaccion &&
              state.errors.transaccion.map((error: string) => (
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
          href="/configuracion/clientes"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Cargar pago</Button>
      </div>
    </form>
  );
}