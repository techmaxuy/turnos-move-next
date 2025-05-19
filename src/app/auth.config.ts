import type { NextAuthConfig } from 'next-auth';
import { fetchisAdmin } from './lib/data';
import type { User } from '@/app/lib/definitions';
import { fetchUser } from './lib/data';

 
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
            const isAdmin = await fetchisAdmin(user.id);
            session.isAdmin = isAdmin;
            session.userId = user.id;
            return session
    },


  },
  
   
  
  providers: [], // Add providers with an empty array for now
  //debug: true,
} satisfies NextAuthConfig