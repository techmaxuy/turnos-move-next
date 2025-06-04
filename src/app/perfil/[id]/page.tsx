import Form from '@/app/ui/perfil/editarPerfil';
import { fetchClienteById } from '@/app/lib/data';
import { auth } from "../../auth"
import NoAutenticado from "../../ui/noAutenticado";
import { quicksand } from '@/app/ui/fonts';
 
export default async function Page(props: { params: Promise<{ id: string }> }) {

  const session = await auth()
  if (!session) return <NoAutenticado />

    const params = await props.params;
    const id = params.id;
    const [cliente] = await Promise.all([
      fetchClienteById(id)
    ]);

  return (
    <main >
      <div className={`${quicksand.className} text-2xl  rounded border-2 border-solid  border-[#01feab] bg-[#404040] p-6 m-6 md:mt-40`}>
        <p className="text-2xl p-x-1">Edicion de datos personales</p>
        <Form customer={cliente[0]}/>
      </div>
      
    </main>
  );
}