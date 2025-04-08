'use client';


import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Configuracion', href: '/configuracion' },
  { name: 'Portal de Ingreso', href: '/portalingreso' },
  { name: 'Mis Creditos', href: '/perfil/miscreditos'  },
  { name: 'Mis Reservas', href: '/perfil/misreservas' },
  { name: 'Reservar', href: '/perfil/reservar' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] rounded-md bg-[#212121] hover:bg-[#01feab] hover:text-[#212121]',
              {
                'text-[#01feab]': pathname === link.href,
              },
            )}
          >
            <p className="">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

//flex h-[48px] grow items-center justify-center gap-2  p-3 text-sm font-medium  md:flex-none md:justify-start md:p-2 md:px-3
//hidden md:block