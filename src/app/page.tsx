import Image from "next/image";
import { auth } from "./auth"
import clsx from "clsx";
import { signOut } from './auth';

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
        <h1 className="text-center text-4xl mb-5">
          Bienvenido a Move
        </h1>
        <p className="text-center text-2xl mb-5">
          Aplicacion de reservas de turnos
        </p>
        
        <div className={clsx(
          session ? "hidden" : "block"
        )}>
          <a className="rounded-full border border-solid border-[#01feab] transition-colors flex items-center justify-center bg-[#212121] hover:bg-[#00885b] h-10 w-40"
              href="/login"
              rel="noopener noreferrer">
              Iniciar Sesion
          </a>  
        </div>
        <div className={clsx("my-2",
          !session ? "hidden" : "block"
        )}> 
          <a className="rounded-full border border-solid border-[#01feab] transition-colors flex items-center justify-center bg-[#212121] hover:bg-[#00885b] h-10 w-40"
              href="/perfil"
              rel="noopener noreferrer">
              Mi Perfil
          </a>  
        </div>
        <div className="my-2"> 
          <a className="rounded-full border border-solid border-[#01feab] transition-colors flex items-center justify-center bg-[#212121] hover:bg-[#00885b] h-10 w-40"
              href="/register"
              rel="noopener noreferrer">
              Registrar Usuario
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