import Image from 'next/image';
import { ModificarCliente, BorrarCliente } from '@/app/ui/configuracion/clientes/buttons';
//import InvoiceStatus from '@/app/ui/configuracion/clientes/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchClases } from '@/app/lib/data';

export default async function TableClases() {
  const clases= await fetchClases();
  console.log(clases);
  //const nombre=clases[0].nombre
  //const dias = clases[0].dias;
  //const horas = clases[0].horas;


  return (
        <div className="rounded-lg bg-[#568072] p-2 md:pt-0 mt-2">
          <div className="md:hidden">
              <div className="flex flex-col mb-1 w-full rounded-md bg-white p-1 text-black">
                      <div className="flex flex-row w-full items-center justify-between text-sm font-medium">
                        <p className="px-5">
                          
                        </p>
                      </div>
              </div>

          </div>
          <table className="hidden min-w-full text-white md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Nombre
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Dias
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Horas
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Editar</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {clases.map(({  nombre, dias, horas }) => (
                <tr key={nombre} 
                  className="w-full border-b py-3 text-black text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{nombre}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {dias.map((dia) => (<p key={dia}>{dia}</p>))}
                  </td>     
                  <td className="whitespace-nowrap px-3 py-3">
                     {horas.map((hora) => (<p key={hora}>{hora} hs.</p>))}
                  </td>
                </tr>
                ))}
            </tbody>
          </table>
        </div>
  );
}