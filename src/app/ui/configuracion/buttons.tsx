import Link from 'next/link';

export function AgregarClase() {
  return (
    <Link
      href="/configuracion/clases/agregar"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span>Agregar Clase</span>
    </Link>
  );
}