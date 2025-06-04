import Link from "next/link"
import { auth } from "../../auth"
import { quicksand } from '@/app/ui/fonts';
 
export default async function PerfilDashboard() {
  const session = await auth()
 
  if (!session?.user) return null

  return (
    <div className="rounded border-2 border-solid  border-[#01feab] align-center m-6 p-6 md:mt-40 bg-[#303030]" >
      <h1 className={`${quicksand.className} text-2xl p-x-1`}>Mis datos personales</h1>
      <p className={`${quicksand.className} text-white m-6`}>Email: {session.user.email}</p>
       <p className={`${quicksand.className} text-white m-6`}>Nombre: {session.user.name}</p>

      <div className="flex justify-end">
      <Link
        className={`${quicksand.className} rounded-lg border border-solid border-[#01feab] transition-colors flex items-center justify-center bg-[#212121] hover:bg-[#00885b] h-8 w-25 mt-10`}
        href={`/perfil/${session.customerId}/`}
      >
        Editar
      </Link>
      </div>
    </div>
  )
} 

/*

        <p className="text-white m-6">{session.expires}</p>
      <p className="text-white m-6">{session.userId}</p>
      <p className="text-white m-6">{session.isAdmin.toString()}</p>
      <p className="text-white m-6">{session.customerId}</p>
*/