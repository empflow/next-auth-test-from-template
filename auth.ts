import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { type NextAuthConfig } from "next-auth";
import { PROTECTED_ROUTES } from "./lib/constants";

export const nextAuthConfig = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
    buttonText: "In Sign",
  },
  providers: [GitHub, Google],
  callbacks: {
    authorized({ request, auth }) {
      let isAuthorized = true;
      const { pathname } = request.nextUrl;

      if (PROTECTED_ROUTES.includes(pathname)) {
        isAuthorized = !!auth;
      }
      return isAuthorized;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut, update } =
  NextAuth(nextAuthConfig);
