import LatestReservas from "@/app/ui/perfil/reservas/latest-reservas";
import { lusitana } from '@/app/ui/fonts';
import { AgregarReserva } from "@/app/ui/perfil/reservas/buttons";
import { auth } from "../../auth"
import NoAutenticado from "../../ui/noAutenticado";
import { quicksand } from '@/app/ui/fonts';


export default async function MisReservas() {

      const session = await auth()
    if (!session) return <NoAutenticado />

    const loginId = session?.customerId || '';


  return (
    <div className={`${quicksand.className} text-2xl p-x-1 rounded border-2 border-solid  border-[#01feab] align-center m-6 p-6 md:mt-40 bg-[#303030]`}>
      <h1 className="text-2xl p-x-1">Mis reservas</h1>
      <LatestReservas customerId={loginId} />
      <div className="flex justify-end">
        <AgregarReserva />
      </div>
    </div>
  );
}  