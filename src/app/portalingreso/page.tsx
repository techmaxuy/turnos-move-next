import FormIngreso from "@/app/ui/portalingreso/formIngreso";
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
export default function IngresoPage() {
  return (
    <div className="mx-2 mb-4 md:mt-15">
      <h1 className={`${lusitana.className} text-2xl p-x-1 text-center`}>Ingreso</h1>
      <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>

      <FormIngreso  />
        </Suspense>
    </div>
  );
}  