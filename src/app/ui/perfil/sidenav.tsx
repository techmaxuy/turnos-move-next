import Link from 'next/link';
import NavLinks from "./nav-links";
import Image from "next/image";
import { signOut } from '../../auth';
import { auth } from "../../auth"



export default async function SideNav() {

const session = await auth()

  return (
        <div className="flex grow flex-row justify-between space-x-1 md:flex-col md:space-x-0 md:space-y-1 place-items-center md:place-items-stretch px-1">
          <Link
            className=""
              href="/"
          > 
            <Image
              className="min-h-[100px] min-w-[100px]"
              src="/logonuevo.svg"
              alt="Move logo"
              width={150}
              height={150}
              priority
            />
          </Link>
          <NavLinks isAdmin={Boolean(session?.isAdmin)}/>
          <form action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}>
            <button  className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-[#212121] p-3 text-xs font-small md:text-sm md:font-medium hover:bg-[#01feab] hover:text-black md:flex-none md:justify-start md:p-2 md:px-3">       
                Cerrar Sesion
            </button>
          </form>
        </div>
  );
}

