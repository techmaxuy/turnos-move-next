'use client';

import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import { signup } from '../lib/actions';

export default function RegisterForm() {

  const [errorMessage, formAction] = useActionState(
    signup,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-[#212121] px-6 pb-4 pt-8 border-2 border-white">
        <p className="mb-3 text-2xl">
          Registro en Move trainging
        </p>
          <div className="w-full">

          <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-white"
                htmlFor="nombre"
              >
                Nombre
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="nombre"
                  type="text"
                  name="nombre"
                  placeholder="ingresa tu nombre"
                  required
                />

              </div>
            </div>
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-white"
                htmlFor="email"
              >
                Correo electronico
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="ingresa tu correo electronico"
                  required
                />

              </div>
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-white"
                htmlFor="password"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Ingresa tu contraseña"
                  required
                  minLength={6}
                />
              </div>
              <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-white"
                htmlFor="password"
              >
                Confirmar Contraseña
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password2"
                  type="password"
                  name="password2"
                  placeholder="Ingresa tu contraseña"
                  required
                  minLength={6}
                />
              </div>
            </div>
          </div>
        </div>
       
        <Button type="submit" className="mt-4 w-full " >
          Registrar
        </Button>
        {errorMessage && (
            <>
              <p className="text-sm text-red-500">{errorMessage.message}</p>
            </>
          )}
      </div>
    </form>
  );
}
