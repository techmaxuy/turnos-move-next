import SideNav from "@/app/ui/configuracion/sidenavconf";

export default function Layout({  children,}: Readonly<{  children: React.ReactNode;}>) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}