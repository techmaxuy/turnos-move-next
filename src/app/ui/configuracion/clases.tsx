import { quicksand } from '@/app/ui/fonts';
import { fetchClases } from '@/app/lib/data';

export default async function TableClases() {
  const clases= await fetchClases();

  return (
        <div className="rounded-lg bg-[#484848] p-2 md:pt-0 mt-6">
          <table className={`${quicksand.className} text-2xl p-x-1 min-w-full text-white`}>
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
              </tr>
            </thead>
            <tbody className="bg-white">
              {clases.map(({  nombre, dias, horas }) => (
                <tr key={nombre} 
                  className="w-full border-b py-3 text-black text-sm last-of-type:border-none"
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