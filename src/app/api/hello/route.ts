import { createReservaV2 } from "@/app/lib/actions";
import { auth } from "../../auth"



export  async function GET(request: Request) {

  // Voy a crear una reserva de ejemplo para probar la api y para dejar un registro de la invocación
 
 const reserva = {
    clase: 'test cron job',
    hora: '5',
  };
  
  const formData = new FormData();
formData.append('clase', reserva.clase);
formData.append('hora', reserva.hora);

await createReservaV2({}, formData);
    

  
  return new Response('Hello from Vercel!');

}