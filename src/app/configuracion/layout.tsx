import SideNav from "@/app/ui/configuracion/sidenavconf";
import { auth } from "../auth"


export default async function Layout({  children,}: Readonly<{  children: React.ReactNode;}>) {

  const session = await auth()
  if (!session) return Response.redirect(new URL('/login'));

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-64">
        <SideNav />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}