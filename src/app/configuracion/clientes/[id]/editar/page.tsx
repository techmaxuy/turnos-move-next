import Form from '@/app/ui/configuracion/clientes/editarClient';
import Breadcrumbs from '@/app/ui/configuracion/clientes/breadcrumbs';
import { notFound } from 'next/navigation';
 
export default async function Page(props: { params: Promise<{ id: string }> }) {

    const params = await props.params;
    const id = params.id;

  return (
    <main className="mx-4 mb-4">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Clientes', href: '/configuracion/clientes' },
          {
            label: 'Agregar cliente',
            href: `/configuracion/clientes/${id}/editar`,
            active: true,
          },
        ]}
      />
      <div className="rounded-lg bg-[#212121] p-2 md:pt-0">
      <Form id={id}/>
      </div>
      
    </main>
  );
}