

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
          className="dark:invert"
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
          Reservar clases
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


// "rounded-full border-solid-[#01feab] transition-colors bg-[#212121] hover:bg-[#00885b] text-center h-10 w-40 items-center justify-center font-medium text-sm sm:text-base sm:h-12 px-4"
// "rounded-full border border-solid border-[#01feab] dark:border-white/[.145] transition-colors flex items-center justify-center bg-[#212121] hover:bg-[#00885b] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//import * as React from "react";

//export const MyComp = () => {

 // React.useEffect(() => {
    // window is accessible here.
 //   console.log("window.innerHeight", window.innerHeight);
 // }, []);

 // return (<div></div>)
//}