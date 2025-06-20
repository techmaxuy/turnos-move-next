import clsx from 'clsx';
import { fetchLatestInvoices } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';
import { ModificarPago, BorrarPago } from '@/app/ui/buttons';

export default async function TableLatestPagos() {
  const latestInvoices = await fetchLatestInvoices();

  return (
          <div className="rounded-lg bg-[#636363] p-2 md:pt-0 mt-2">
                    <div className="md:hidden">
                      {latestInvoices?.map((pago) => (
                        <div key={pago.id} className="flex flex-col mb-1 w-full rounded-md bg-white p-1 text-black">
                                <div className="flex flex-row w-full items-center justify-between text-sm font-medium">
                                  <p className="px-5">
                                    {pago.name} - {pago.date} - ${pago.amount}
                                  </p>
                                  <div className="flex justify-end gap-2">
                                    <ModificarPago id={pago.id} />
                                    <BorrarPago id={pago.id} />
                                  </div>
                                </div>
                        </div>
                      ))}
                    </div>
                    <table className="hidden min-w-full text-white md:table">
                      <thead className="rounded-lg text-left text-sm font-normal">
                        <tr>
                          <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                            Fecha
                          </th>
                          <th scope="col" className="px-3 py-5 font-medium">
                            Nombre
                          </th>
                          <th scope="col" className="px-3 py-5 font-medium">
                            Monto
                          </th>
                          <th scope="col" className="relative py-3 pl-6 pr-3">
                            <span className="sr-only">Editar</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {latestInvoices?.map((pago) => (
                          <tr
                            key={pago.id}
                            className="w-full border-b py-3 text-black text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                          >
                            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                              <div className="flex items-center gap-3">
                                <p>{pago.date}</p>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-3">
                              <p>{pago.name}</p>
                            </td>
                            <td className="whitespace-nowrap px-3 py-3">
                              <p>${pago.amount}</p>
                            </td>
                            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                              <div className="flex justify-end gap-3">
                                <ModificarPago id={pago.id} />
                                <BorrarPago id={pago.id} />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

  );
}
