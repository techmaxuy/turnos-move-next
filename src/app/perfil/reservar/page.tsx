import ReservaForm from '@/app/ui/perfil/reservas/reservar-form';
import { fetchCustomers } from '@/app/lib/data';
import { auth } from "../../auth"
import NoAutenticado from "../../ui/noAutenticado";
import Calendar from '@/app/ui/perfil/reservas/calendar';
 
export default async function Reservar(props: {
  searchParams?: Promise<{
    query?: string;
    message?: string
  }>;
}) {

     const session = await auth()
    if (!session) return <NoAutenticado />
    const loginId = session?.customerId || '';

    const clases = [{ id: 'funcional', name: 'Funcional'},
                      { id: 'crossfit', name: 'Crossfit'}
                    ];

                    const horas = [{ id: '19', name: '19 horas'},
    { id: '20', name: '20 horas'},
    { id: '21', name: '21 horas'},];


    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const message = searchParams?.message || '';




  const customers = await fetchCustomers();
 
  return (
    <main>
      
      <Calendar />
      <ReservaForm clases={clases} horas={horas} customerId={loginId}/> 
      <div>
        <p>
          {message && (
            <span className="text-green-500">
              {message}
            </span>
          )}
        </p>
        <p>
          {query && (
            <span className="text-green-500">
              {query}
            </span>
          )}
        </p>
      </div>
    </main>
  );
}  