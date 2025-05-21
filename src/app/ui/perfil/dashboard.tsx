import Link from "next/link"
import { auth } from "../../auth"
import { quicksand } from '@/app/ui/fonts';
 
export default async function PerfilDashboard() {
  const session = await auth()
 
  if (!session?.user) return null
 
  return (
    <div >
      <h1 className={`${quicksand.className} text-2xl p-x-1`}>Mis datos</h1>
      <p className="text-white m-6">Email: {session.user.email}</p>
       <p className="text-white m-6">Nombre: {session.user.name}</p>

      <Link
        className={`${quicksand.className} rounded-full border border-solid border-[#01feab] transition-colors flex items-center justify-center bg-[#212121] hover:bg-[#00885b] h-10 w-40`}
        href={`/perfil/${session.customerId}/`}


      >
        Editar perfil
      </Link>
    </div>
  )
} 

/*

        <p className="text-white m-6">{session.expires}</p>
      <p className="text-white m-6">{session.userId}</p>
      <p className="text-white m-6">{session.isAdmin.toString()}</p>
      <p className="text-white m-6">{session.customerId}</p>
*/