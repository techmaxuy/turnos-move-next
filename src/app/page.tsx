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
        <h1 className="text-center text-5xl">
          Bienvenido a Move
        </h1>
        <p className="text-center">
          Aplicacion de reservas de turnos
        </p>
        <a
            className="rounded-full border-solid-[#01feab] transition-colors bg-[#212121] hover:bg-[#00885b]"
            href="/perfil"
            rel="noopener noreferrer"
          >
            Iniciar Sesion
        </a>
      </main>
    </div>
  );
}
