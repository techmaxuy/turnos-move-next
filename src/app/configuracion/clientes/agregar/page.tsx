import Form from '@/app/ui/configuracion/clientes/createClient-form';
import Breadcrumbs from '@/app/ui/configuracion/clientes/breadcrumbs';
 
export default async function Page() {
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
      <Form />
    </main>
  );
}