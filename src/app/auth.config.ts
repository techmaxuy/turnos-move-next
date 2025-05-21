import type { NextAuthConfig } from 'next-auth';
import { fetchisAdmin } from './lib/data';
import type { User , Customer } from '@/app/lib/definitions';
import { fetchUser } from './lib/data';
import { fetchClienteByEmail } from './lib/data';

 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {

      
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.includes('/perfil');
   
      if (isOnDashboard) {
          if (isLoggedIn) return true;
          return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
          return Response.redirect(new URL('/perfil', nextUrl));
      }
      return true;
      
    },
    async session({ session }) {
            const user: User = await fetchUser(session?.user?.email);
            session.userId = user.id;
            const isAdmin: boolean = await fetchisAdmin(session?.userId);
            session.isAdmin = isAdmin;

            if (!isAdmin) {

              const customer: Customer = await fetchClienteByEmail(session?.user?.email);
              session.customerId = customer.id
            }
            return session
    },


  },
  
   
  
  providers: [], // Add providers with an empty array for now
  //debug: true,
} satisfies NextAuthConfig