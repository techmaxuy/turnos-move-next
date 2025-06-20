
import Link from 'next/link';
import { borrarCliente } from '@/app/lib/actions';

export function AgregarCliente() {
  return (
    <Link
      href="/configuracion/clientes/agregar"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span>Crear cliente</span>
    </Link>
  );
}


export function ModificarCliente({ id }: { id: string }) {
  return (
    <Link
      href={`/configuracion/clientes/${id}/editar`}
      className="rounded-md border-1 p-2 hover:bg-gray-100  text-[#707070]">
      editar
    </Link>
  );
}

export function BorrarCliente({ id }: { id: string }) {
  const borrarClienteWithId = borrarCliente.bind(null, id);

  return (
    <form action={borrarClienteWithId}>
      <button type="submit" className="rounded-md border-1 p-2 hover:bg-gray-100  text-[#707070]">
        <span className="sr-only"></span>
        borrar
      </button>
    </form>
  );
}

export function ModificarPago({ id }: { id: string }) {
  return (
    <Link
      href={`/configuracion/pagos/${id}/editar`}
      className="rounded-md border-1 p-2 hover:bg-gray-100  text-[#707070]">
      editar
    </Link>
  );
}

export function BorrarPago({ id }: { id: string }) {
  const borrarClienteWithId = borrarCliente.bind(null, id);

  return (
    <form action={borrarClienteWithId}>
      <button type="submit" className="rounded-md border-1 p-2 hover:bg-gray-100  text-[#707070]">
        <span className="sr-only"></span>
        borrar
      </button>
    </form>
  );
}


export function ModificarClase({ id }: { id: string }) {
  return (
    <Link
      href={`/configuracion/clases/${id}/editar`}
      className="rounded-md border-1 p-2 hover:bg-gray-100  text-[#707070]">
      editar
    </Link>
  );
}
