
import Image from "next/image";
import { auth } from "./auth"
import clsx from "clsx";
import { signOut } from './auth';
import { quicksand } from '@/app/ui/fonts';
import * as React from "react";

export default async function Home() {

     const session = await auth()


  return (
    <div className="items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col mb-5 items-center justify-center">
        <Image
          src="/logonuevo.svg"
          alt="Move logo"
          width={400}
          height={400}
          priority
        />
        <h1 className={`${quicksand.className} text-center text-4xl mb-5`}>
          Bienvenido
        </h1>
        <p className={`${quicksand.className} text-center text-2xl mb-5`}>
          Aplicacion de reservas
        </p>
        
        <div className={clsx(
          session ? "hidden" : "block"
        )}>
          <a className={`${quicksand.className} rounded-full border border-solid border-[#01feab] transition-colors flex items-center justify-center bg-[#212121] hover:bg-[#00885b] h-10 w-40`}
              href="/login"
              rel="noopener noreferrer">
              INICIAR
          </a>  
        </div>
        <div className={clsx("my-2",
          !session ? "hidden" : "block"
        )}> 
          <a className={`${quicksand.className} rounded-full border border-solid border-[#01feab] transition-colors flex items-center justify-center bg-[#212121] hover:bg-[#00885b] h-10 w-40`}
              href="/perfil"
              rel="noopener noreferrer">
              Mi Perfil
          </a>  
        </div>
        <div className="my-2"> 
          <a className={`${quicksand.className} rounded-full border border-solid border-[#01feab] transition-colors flex items-center justify-center bg-[#212121] hover:bg-[#00885b] h-10 w-40`}
              href="/register"
              rel="noopener noreferrer">
              REGISTRARSE
          </a>  
        </div>
        <div className={clsx(
          !session ? "hidden" : "block"
        )}>
          <form action={async () => {
                              'use server';
                              await signOut({ redirectTo: '/' });
                            }}>
                    <button className="rounded-full border border-solid border-[#01feab] transition-colors flex items-center justify-center bg-[#212121] hover:bg-[#00885b] h-10 w-40">Cerrar Sesion
                    </button>
            </form>  
        </div>
      </main>
    </div>
  );
}
