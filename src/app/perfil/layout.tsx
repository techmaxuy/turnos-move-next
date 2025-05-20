import SideNav from "@/app/ui/perfil/sidenav";
import { auth } from "../auth"
import NoAutenticado from "../ui/noAutenticado";

export default async function Layout({  children,}: Readonly<{  children: React.ReactNode;}>) {


      const session = await auth()
      if (!session) return <NoAutenticado />

  return (
    <div className="flex flex-col"> 
      <div className="w-full md:w-64">
        <SideNav />
      </div>
      <div className="">
        {children}
      </div>
    </div>
  );
}


//flex h-screen flex-col md:flex-row md:overflow-hidden

//w-full md:w-64
//grow md:overflow-y-auto md:p-12