// app/admin/reservas-detalles/page.tsx
import { fetchReservasByClaseDiaHora } from '@/app/lib/data'; // Tienes que crear esta función
import { auth } from '../../auth';
import NoAutenticado from '@/app/ui/noAutenticado';
import { quicksand } from '@/app/ui/fonts';
// Importa una Server Action para marcar asistencia si la vas a usar aquí
//import { marcarAsistencia } from '@/app/lib/admin-actions'; // Crea esta acción

interface ReservasDetallesPageProps {
  searchParams?: Promise<{
    claseId?: string;
    dia?: string;
    hora?: string;
  }>;
}

export default async function ReservasDetallesPage(props: ReservasDetallesPageProps) {
  const session = await auth();
  if (!session) return <NoAutenticado />; // Asegura que solo admins accedan

  const searchParams = await props.searchParams;
  const claseId = searchParams?.claseId;
  const dia = searchParams?.dia;
  const hora = searchParams?.hora;

  if (!claseId || !dia || !hora) {
    return (
      <div className={`${quicksand.className} p-6 md:mt-40 bg-[#303030] text-white`}>
        <p>Parámetros de búsqueda incompletos para ver las reservas.</p>
      </div>
    );
  }

  // ⭐ Aquí es donde haces la consulta SELECT para obtener las reservas
  const reservas = await fetchReservasByClaseDiaHora(claseId, dia, hora);

if (reservas === false) {
  return <div>No hay reservas</div>;
}

  return (
    <div className={`${quicksand.className} p-6 md:mt-40 bg-[#303030] text-white`}>
      <h1 className="text-2xl font-bold mb-4">Reservas para {claseId} - {hora} hs el {dia}</h1>
      {reservas.length === 0 ? (
        <p>No hay reservas para esta clase en la fecha y hora seleccionadas.</p>
      ) : (
        <ul>
          {reservas.map((reserva) => (
            <li key={reserva.id} className="flex items-center justify-between border-b border-gray-600 py-2">
              <span>{reserva.customername} - {reserva.fechareserva}</span>
              {/* ⭐ Aquí puedes añadir el formulario o botón para marcar asistencia */}
              <form >
                <input type="hidden" name="reservaId" defaultValue={reserva.id} />
                <input type="hidden" name="claseId" defaultValue={claseId} />
                <input type="hidden" name="dia" defaultValue={dia} />
                <input type="hidden" name="hora" defaultValue={hora} />
                <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded">
                  {reserva.utilizada ? 'Asistió' : 'Marcar Asistencia'}
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}