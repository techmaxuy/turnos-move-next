import Form from '@/app/ui/configuracion/clases/create-form';
import { fetchCustomers } from '@/app/lib/data';
import { auth } from "../../../auth"
import NoAutenticado from "../../../ui/noAutenticado";
 
export default async function Page() {

     const session = await auth()
    if (!session) return <NoAutenticado />


  const customers = await fetchCustomers();
 
  return (
    <main>
      <Form />
    </main>
  );
}
