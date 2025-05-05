import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {

      
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.includes('/perfil');
      const isOnConfig = nextUrl.pathname.includes('/configuracion');

      if (isOnDashboard && !isLoggedIn) {
        return Response.redirect(new URL('/login', nextUrl));
      }

      if (isOnConfig && !isLoggedIn) {
        return Response.redirect(new URL('/login', nextUrl));
      }

      if (isOnConfig && isLoggedIn) {
        return Response.redirect(new URL('/configuracion', nextUrl));
      }

      if (isOnDashboard && isLoggedIn) {
        return Response.redirect(new URL('/perfil', nextUrl));
      }
      
      return false;
    },
  },
  providers: [], // Add providers with an empty array for now
  //debug: true,
} satisfies NextAuthConfig