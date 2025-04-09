import Image from 'next/image';
import { ModificarCliente, BorrarCliente } from '@/app/ui/configuracion/clientes/buttons';
//import InvoiceStatus from '@/app/ui/configuracion/clientes/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchCustomers } from '@/app/lib/data';

export default async function CustomersTable() {
  const clientes = await fetchCustomers();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-[#568072] p-2 md:pt-0">


          <div className="md:hidden">
            {clientes?.map((cliente) => (
              <div key={cliente.id} className="flex flex-col mb-2 w-full rounded-md bg-white p-4 text-black">
                <div className="flex items-center justify-between border-b pb-4">
                      <p>
                        {cliente.name}
                      </p>
                </div>
                <div className="flex flex-row w-full items-center justify-between pt-4 text-sm font-medium">
                  <div>
                    <p>
                    {cliente.email} - {cliente.telefono} - {cliente.ci} - {cliente.creditos}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <ModificarCliente id={cliente.id} />
                    <BorrarCliente id={cliente.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <table className="hidden min-w-full text-white md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Nombre
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Telefono
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  CI
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Creditos
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Editar</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {clientes?.map((cliente) => (
                <tr
                  key={cliente.id}
                  className="w-full border-b py-3 text-black text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{cliente.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{cliente.email}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{cliente.telefono}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{cliente.ci}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{cliente.creditos}</p>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <ModificarCliente id={cliente.id} />
                      <BorrarCliente id={cliente.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}