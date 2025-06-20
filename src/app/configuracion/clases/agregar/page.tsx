import Form from '@/app/ui/configuracion/clases/create-form';
import { auth } from "../../../auth"
import NoAutenticado from "../../../ui/noAutenticado";
 
export default async function Page() {

  const session = await auth()
  if (!session) return <NoAutenticado />
 
  return (
    <main>
      <Form />
    </main>
  );
}
