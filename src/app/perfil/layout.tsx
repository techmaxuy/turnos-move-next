import SideNav from "@/app/ui/perfil/sidenav";

export default function Layout({  children,}: Readonly<{  children: React.ReactNode;}>) {
  return (
    <div className="flex flex-col"> 
      <div className="">
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