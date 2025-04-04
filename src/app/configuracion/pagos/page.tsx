import LatestPagos from "@/app/ui/configuracion/lastest-pagos";
export default function Configuracion() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold">Pagos</h1>
      <LatestPagos  />
    </div>
  );
}   