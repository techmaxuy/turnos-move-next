import SideNav from "@/app/ui/configuracion/sidenavconf";



export default function Layout({  children,}: Readonly<{  children: React.ReactNode;}>) {

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-64">
        <SideNav />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}