import Link from "next/link"
import { auth } from "../auth"
import { quicksand } from '@/app/ui/fonts';
 
export default async function UserAvatar() {
  const session = await auth()
 
  if (!session?.user) return null
 
  return (
    <div>
      <p className="text-white m-6">{session.user.email}</p>
       <p className="text-white m-6">{session.user.name}</p>
        <p className="text-white m-6">{session.expires}</p>
      <p className="text-white m-6">{session.userId}</p>
      <p className="text-white m-6">{session.isAdmin.toString()}</p>
      <p className="text-white m-6">{session.customerId}</p>
      <Link
        className={`${quicksand.className} rounded-full border border-solid border-[#01feab] transition-colors flex items-center justify-center bg-[#212121] hover:bg-[#00885b] h-10 w-40`}
        href={`/perfil/${session.customerId}/`}


      >
        Editar perfil
      </Link>
    </div>
  )
} 