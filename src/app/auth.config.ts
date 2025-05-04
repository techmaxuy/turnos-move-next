import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {

      /*
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/perfil');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('perfil', nextUrl));
      }
      return true;
*/
      if (auth?.user) {
        return true; // Usuario autenticado, permitir acceso
      }
      return false; // Usuario no autenticado, denegar acceso

    },
  },
  providers: [], // Add providers with an empty array for now
  debug: true,
} satisfies NextAuthConfig