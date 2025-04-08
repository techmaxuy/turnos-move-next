import Link from 'next/link';
import NavLinks from "./nav-links";
import Image from "next/image";

export default function SideNav() {
  return (
    <div className="">
      <Link
        className=""
        href="/"
      >
        <div className="">
          <Image
                    className="dark:invert"
                    src="/logonuevo.svg"
                    alt="Move logo"
                    width={150}
                    height={150}
                    priority
                  />
        </div>
      </Link>
      <div className="">
        <NavLinks />
        <div className="">
          
        </div>
        <form>
          <button className="">          
            <div className="">
              Cerrar Sesion
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}

//flex h-full flex-col px-3 py-4 md:px-2
//mb-2 flex h-20 items-end justify-start rounded-md bg-black-600 p-4 md:h-40
//w-32 text-white md:w-40
//flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2
//hidden h-auto w-full grow rounded-md  md:block
//flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-[#212121] p-3 text-sm font-medium hover:bg-[#01feab] hover:text-black md:flex-none md:justify-start md:p-2 md:px-3
//hidden md:block
