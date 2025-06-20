import Form from '@/app/ui/configuracion/clientes/editarClient';
import { fetchClienteById } from '@/app/lib/data';
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
    <main>
      <Form customer={cliente[0]}/>
    </main>
  );
}