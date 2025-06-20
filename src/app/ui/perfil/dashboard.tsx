import Link from "next/link"
import { auth } from "../../auth"
import { quicksand } from '@/app/ui/fonts';
import { fetchClienteByEmail } from '../../lib/data';
 
export default async function PerfilDashboard() {
  
  const session = await auth()
  if (!session?.user) return null

  const user = await fetchClienteByEmail(session?.user?.email ?? '');

  return (
    <div>
      <div className="rounded border-2 border-solid  border-[#01feab] align-center m-6 p-6 md:mt-40 bg-[#303030]" >
        <h1 className={`${quicksand.className} text-2xl p-x-1`}>Mis datos personales</h1>
        <p className={`${quicksand.className} text-white m-6`}>Email: {session.user.email}</p>
        <p className={`${quicksand.className} text-white m-6`}>Nombre: {session.name}</p>

        <div className="flex justify-end">
          <Link
            className={`${quicksand.className} rounded-lg border border-solid border-[#01feab] transition-colors flex items-center justify-center bg-[#212121] hover:bg-[#00885b] h-8 w-25 mt-10`}
            href={`/perfil/${session.customerId}/`}
          >
            Editar
          </Link>
        </div>
      </div>
      <div className="rounded border-2 border-solid  border-[#01feab] align-center m-6 p-6 bg-[#303030]" >
        <div>
          <h1 className={`${quicksand.className} text-2xl p-x-1`}>Creditos Disponibles</h1>
        </div>
        <div>
          <p className={`${quicksand.className} text-white m-6`}>{user.creditos}</p>
        </div>
      </div>
    </div>
  )
} 
