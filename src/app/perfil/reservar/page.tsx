
import {  fetchClasesByDay } from '@/app/lib/data';
import { auth } from "../../auth"
import NoAutenticado from "../../ui/noAutenticado";
import ReservaPageContent from '@/app/ui/perfil/reservas/reservaPageContent';
import { quicksand } from '@/app/ui/fonts';

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
    let diaPorDefecto = (new Date().toLocaleDateString('es-ES', { weekday: 'long' })).toLowerCase();

    if (diaPorDefecto === 'sábado') {
      diaPorDefecto = 'sabado'
    } else if (diaPorDefecto === 'miércoles') {
      diaPorDefecto = 'miercoles'
    } 

    // Obtiene los datos iniciales en el servidor para el día por defecto
  const initialData = await fetchClasesByDay(diaPorDefecto);
  
  return (
    <div className={`${quicksand.className} text-2xl p-x-1 rounded border-2 border-solid  border-[#01feab] align-center m-6 p-6 md:mt-40 bg-[#303030]`}>
      <main>
        <ReservaPageContent 
          initialData={initialData}
          customerId={loginId} 
          onDiaChange={getServerClasesYHorasPorDia} 
          diaInicial={diaPorDefecto}
        />
      </main>
    </div>
  );
}  