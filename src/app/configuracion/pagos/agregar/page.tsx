import Form from '@/app/ui/configuracion/pagos/create-form';
import Breadcrumbs from '@/app/ui/configuracion/pagos/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Pagos', href: '/configuracion/pagos' },
          {
            label: 'Agregar pago',
            href: '/configuracion/pagos/agregar',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}