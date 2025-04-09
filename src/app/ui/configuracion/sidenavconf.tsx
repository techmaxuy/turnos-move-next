import Link from 'next/link';
import NavLinks from "./nav-linksconf";
import Image from "next/image";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2"> 
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 place-items-center md:place-items-stretch">
      <Link
        className=""
        href="/"
      >
          <Image
                    className="dark:invert"
                    src="/logonuevo.svg"
                    alt="Move logo"
                    width={150}
                    height={150}
                    priority
                  />
      </Link>
        <NavLinks />
        <form>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-[#212121] p-3 text-xs font-small md:text-sm md:font-medium hover:bg-[#01feab] hover:text-black md:flex-none md:justify-start md:p-2 md:px-3">Cerrar Sesion
          </button>
        </form>http://localhost:3000/configuracion/clientes/agregar
      </div>
    </div>
  );
}