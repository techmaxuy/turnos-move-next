//import {fetchLatestInvoices} from "@/app/lib/data";
import UserAvatar from "../ui/UserAvatar";

export default async function Perfil() {
  //const latestInvoices = await fetchLatestInvoices();

  return (
    <div className="flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold">Pagina de Perfil de usuario</h1>
      <p className="text-lg">Este es un dato de mi perfil de usuario.</p>
      <UserAvatar />
    </div>
  );
}   

/*
import Form from '@/app/ui/configuracion/clientes/editarClient';
import Breadcrumbs from '@/app/ui/configuracion/clientes/breadcrumbs';
import { fetchClienteById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { auth } from "../../../../auth"
import NoAutenticado from "../../../../ui/noAutenticado";
 
export default async function Page(props: { params: Promise<{ id: string }> }) {

  const session = await auth()
  if (!session) return <NoAutenticado />

    const params = await props.params;
    const id = params.id;
    const [cliente] = await Promise.all([
      fetchClienteById(id)
    ]);

  return (
    <main className="mx-4 mb-4">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Clientes', href: '/configuracion/clientes' },
          {
            label: 'Editar cliente',
            href: `/configuracion/clientes/${id}/editar`,
            active: true,
          },
        ]}
      />
      <div className="rounded-lg bg-[#212121] p-2 md:pt-0">
      <Form customer={cliente[0]}/>
      </div>
      
    </main>
  );
}


*/