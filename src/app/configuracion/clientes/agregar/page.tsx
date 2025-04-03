import Form from '@/app/ui/configuracion/clientes/create-form';
import Breadcrumbs from '@/app/ui/configuracion/clientes/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Clientes', href: '/configuracion/clientes' },
          {
            label: 'Agregar cliente',
            href: '/configuracion/clientes/agregar',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}