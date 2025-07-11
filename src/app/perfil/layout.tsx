import SideNav from "@/app/ui/perfil/sidenav";
import { auth } from "../auth"
import NoAutenticado from "../ui/noAutenticado";

export default async function Layout({  children,}: Readonly<{  children: React.ReactNode;}>) {


  const session = await auth()
  if (!session) return <NoAutenticado />

  return (
    <div className="flex flex-col md:flex-row h-100dvh"> 
      <div className="md:w-64">
        <SideNav />
      </div> 
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}

