import Form from '@/app/ui/configuracion/clientes/editarClient';
import Breadcrumbs from '@/app/ui/configuracion/clientes/breadcrumbs';
import { fetchClienteById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page(props: { params: Promise<{ id: string }> }) {

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