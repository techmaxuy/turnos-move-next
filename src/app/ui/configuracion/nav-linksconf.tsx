'use client';


import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Clientes', href: '/configuracion/clientes' },
  { name: 'Pagos', href: '/configuracion/pagos'  },
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
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-[#212121] p-3 text-sm font-medium hover:bg-[#01feab] hover:text-[#212121] md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'text-[#01feab]': pathname === link.href,
              },
            )}
          >
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}