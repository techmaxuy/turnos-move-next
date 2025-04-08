import SideNav from "@/app/ui/configuracion/sidenavconf";

export default function Layout({  children,}: Readonly<{  children: React.ReactNode;}>) {
  return (
    <div className="flex flex-col">
      <div className="w-full md:w-64">
        <SideNav />
      </div>
      <div className="">{children}</div>
    </div>
  );
}