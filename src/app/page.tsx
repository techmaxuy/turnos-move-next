import Image from "next/image";

export default function Home() {
  return (
    <div className="items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col pb-5 items-center justify-center">
        <Image
          className="dark:invert"
          src="/logonuevo.svg"
          alt="Move logo"
          width={400}
          height={400}
          priority
        />
        <h1 className="text-center text-4xl pb-5">
          Bienvenido a Move
        </h1>
        <p className="text-center text-2xl pb-5">
          Aplicacion de reservas de turnos
        </p>
        <a className="rounded-full border border-solid border-[#01feab] transition-colors flex items-center justify-center bg-[#212121] hover:bg-[#00885b] h-10 w-40"
            href="/perfil"
            rel="noopener noreferrer">
            Iniciar Sesion
        </a>
      </main>
    </div>
  );
}


// "rounded-full border-solid-[#01feab] transition-colors bg-[#212121] hover:bg-[#00885b] text-center h-10 w-40 items-center justify-center font-medium text-sm sm:text-base sm:h-12 px-4"
// "rounded-full border border-solid border-[#01feab] dark:border-white/[.145] transition-colors flex items-center justify-center bg-[#212121] hover:bg-[#00885b] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"