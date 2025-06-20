import { ModificarClase } from '@/app/ui/buttons';
import { fetchClases } from '@/app/lib/data';

export default async function TableClases() {
  const clases= await fetchClases();

  return (
        <div className="rounded-lg bg-[#636363] p-2 md:pt-0 mt-2">
          <div className="md:hidden">
            {clases?.map((clase) => (
              <div key={clase.nombre} className="flex flex-col mb-1 w-full rounded-md bg-white p-1 text-black">
                      <div className="flex flex-row w-full items-center justify-between text-sm font-medium">
                        <p className="px-5">
                          {clase.nombre}
                        </p>
                        <div className="flex justify-end gap-2">
                          <ModificarClase id={clase.nombre} />
                        </div>
                      </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-white md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th className="px-3 py-5 font-medium">
                  Nombre
                </th>
                <th  className="px-3 py-5 font-medium">
                  Dias
                </th>
                <th  className="px-3 py-5 font-medium">
                  Horas
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {clases.map(({  nombre, dias, horas }) => (
                <tr key={nombre} 
                  className="w-full border-b py-3 text-black text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="py-3 px-2">
                      <p>{nombre}</p>
                  </td>
                  <td className="px-2 py-3">
                    {dias.map((dia) => (<span key={dia}>{dia},  </span>))}
                  </td>    
                    <td className="px-2 py-3">
                      {horas.map((hora) => (<span key={hora}>{hora}, </span>))}
                      hs.
                    </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <ModificarClase id={nombre} />
                    </div>
                  </td>
                </tr>
                ))}
            </tbody>
          </table>
        </div>
  );
}