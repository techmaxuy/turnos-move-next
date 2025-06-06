'use client';


import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
let links = [];

export default function NavLinks({ isAdmin }: { isAdmin: boolean  } = { isAdmin: false }) {

  if (isAdmin) {

   links = [

  { name: 'Configuracion', href: '/configuracion' },
  { name: 'Portal de Ingreso', href: '/portalingreso' },
  { name: 'Reservas', href: '/reservas' },
  ];
  } else {
  links = [
    { name: 'Mi Perfil', href: '/perfil'  },
    { name: 'Mis Reservas', href: '/perfil/misreservas' },
    { name: 'Reservar', href: '/perfil/reservar' },
  ];
  }

  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] items-center justify-center gap-2  p-3 rounded-md bg-[#212121] hover:bg-[#01feab] hover:text-[#212121] text-xs font-small md:text-sm md:font-medium md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'text-[#01feab]': pathname === link.href,
              },
            )}
          >
            <p>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

//flex h-[48px] grow items-center justify-center gap-2  p-3 text-sm font-medium  md:flex-none md:justify-start md:p-2 md:px-3
//hidden md:block