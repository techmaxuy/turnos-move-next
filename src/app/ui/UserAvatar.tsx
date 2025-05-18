import { auth } from "../auth"
 
export default async function UserAvatar() {
  const session = await auth()
 
 

  if (!session?.user) return null
 
  return (
    <div>
      <p className="text-white m-6">{session.user.email}</p>

    </div>
  )
}