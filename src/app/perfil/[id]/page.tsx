import Form from '@/app/ui/perfil/editarPerfil';
import { fetchClienteById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { auth } from "../../auth"
import NoAutenticado from "../../ui/noAutenticado";
 
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
      <div className="rounded-lg bg-[#212121] p-2 md:pt-0">
      <Form customer={cliente[0]}/>
      </div>
      
    </main>
  );
}