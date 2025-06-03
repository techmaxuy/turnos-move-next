import ReservaForm from '@/app/ui/perfil/reservas/reservar-form';
import {  fetchClasesByDay } from '@/app/lib/data';
import { auth } from "../../auth"
import NoAutenticado from "../../ui/noAutenticado";
import Calendar from '@/app/ui/perfil/reservas/calendar';

async function getServerClasesYHorasPorDia(diaSeleccionado: string) {
  'use server'; // ¡Directiva de Server Action!
  console.log(`Server Action: Obteniendo datos para el día: ${diaSeleccionado}`);
  // Aquí invocas tu lógica de base de datos
  const data = await fetchClasesByDay(diaSeleccionado);
  const clases = data.map((clase) => ({
    clase_id: clase.clase_id,
    nombre: clase.nombre,
    dias: clase.dias,
    horas: clase.horas,
  }));
  return clases; // { clases: [], horas: [] }
}
 
export default async function Reservar() {

     const session = await auth()
    if (!session) return <NoAutenticado />
    const loginId = session?.customerId || '';

    const diaPorDefecto = (new Date().toLocaleDateString('es-ES', { weekday: 'long' })).toLowerCase();
    console.log(`Día por defecto: ${diaPorDefecto}`);

    // Obtiene los datos iniciales en el servidor para el día por defecto
  const initialData = await fetchClasesByDay(diaPorDefecto);
  
  return (
    <main>
      
      <Calendar onDiaChange={getServerClasesYHorasPorDia}/>
      <ReservaForm initialData={initialData}  customerId={loginId} /> 
    </main>
  );
}  