import LatestReservas from "@/app/ui/perfil/reservas/latest-reservas";
import { lusitana } from '@/app/ui/fonts';
import { AgregarReserva } from "@/app/ui/perfil/reservas/buttons";
import { auth } from "../../auth"
import NoAutenticado from "../../ui/noAutenticado";


export default async function MisReservas() {

      const session = await auth()
    if (!session) return <NoAutenticado />

    const loginId = session?.customerId || '';


  return (
    <div className="mx-2 mb-4 md:mt-15">
      <h1 className={`${lusitana.className} text-2xl p-x-1`}>Reservas</h1>
      <div className="flex justify-end">
        <AgregarReserva />
      </div>
      <LatestReservas customerId={loginId} />
    </div>
  );
}  