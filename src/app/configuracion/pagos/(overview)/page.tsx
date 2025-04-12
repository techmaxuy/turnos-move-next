import LatestPagos from "@/app/ui/configuracion/lastest-pagos";
import { lusitana } from '@/app/ui/fonts';
import { AgregarPago } from "@/app/ui/configuracion/pagos/buttons";
export default function Configuracion() {
  return (
    <div className="mx-2 mb-4 md:mt-15">
      <h1 className={`${lusitana.className} text-2xl p-x-1`}>Pagos</h1>
      <div className="flex justify-end">
        <AgregarPago />
      </div>
      <LatestPagos  />
    </div>
  );
}   