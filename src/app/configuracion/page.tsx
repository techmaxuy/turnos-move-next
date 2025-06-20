
import TableClases from "@/app/ui/configuracion/clases";
import { AgregarClase } from "@/app/ui/configuracion/buttons";
import { auth } from "../auth"
import NoAutenticado from "../ui/noAutenticado";
import { quicksand } from '@/app/ui/fonts';

export default async function Configuracion() {

  const session = await auth()
  if (!session) return <NoAutenticado />

    return (
      <div className={`${quicksand.className} text-2xl p-x-1 rounded border-2 border-solid  border-[grey] bg-[#212121] align-center m-6 p-6 md:mt-40`}>
        <p className="text-2xl p-x-1">Clases</p>
        <TableClases />
        <div className="flex justify-end mt-4">
          <AgregarClase />
        </div>
      </div>
    );
  }  
