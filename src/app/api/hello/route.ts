import { createReserva } from "@/app/lib/actions";
import { auth } from "../../auth"



export async function GET(request: Request) {


  const session = await auth()
      if (!session) new Response('No autorizado', { status: 401 });

  // Voy a crear una reserva de ejemplo para probar la api y para dejar un registro de la invocación
 
 const reserva = {
    clase: 'test cron job',
    hora: '5',
    utilizada: 'false',
    date: new Date().toISOString(),
  };
  
  const formData = new FormData();
formData.append('clase', reserva.clase);
formData.append('hora', reserva.hora);
formData.append('utilizada', reserva.utilizada);
formData.append('date', reserva.date);

createReserva({}, formData);
    

  
  return new Response('Hello from Vercel!');

}