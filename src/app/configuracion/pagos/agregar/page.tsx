import Form from '@/app/ui/configuracion/pagos/create-form';
import Breadcrumbs from '@/app/ui/configuracion/pagos/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import { auth } from "../../../auth"
import NoAutenticado from "../../../ui/noAutenticado";
 
export default async function Page() {

     const session = await auth()
    if (!session) return <NoAutenticado />


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