import Image from "next/image";

export default function Home() {
  return (
    <div className="items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col">
        <Image
          className="dark:invert"
          src="/logonuevo.svg"
          alt="Move logo"
          width={400}
          height={400}
          priority
        />
        <h1 className="text-4xl sm:text-5xl  text-center">
          Bienvenido a Move
        </h1>
        <p className="text-center text-lg sm:text-xl">
          Aplicacion de reservas de turnos
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-[#01feab] dark:border-white/[.145] transition-colors flex items-center justify-center bg-[#212121] hover:bg-[#00885b] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="/perfil"
            rel="noopener noreferrer"
          >
            Iniciar Sesion
          </a>
        </div>
      </main>
    </div>
  );
}
