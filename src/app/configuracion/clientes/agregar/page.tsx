import Form from '@/app/ui/configuracion/clientes/createClient-form';
import Breadcrumbs from '@/app/ui/configuracion/clientes/breadcrumbs';
import { auth } from "../../../auth"
 
export default async function Page() {


  const session = await auth()
  if (!session) return <div>Not authenticated</div>

  return (
    <main className="mx-4 mb-4">
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
      <div className="rounded-lg bg-[#212121] p-2 md:pt-0">
      <Form />
      </div>
      
    </main>
  );
}
