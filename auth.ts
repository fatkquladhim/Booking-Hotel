import NextAuth from "next-auth";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      authorization: { params: { prompt: "select_account" } },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/signin" },

  callbacks: {
    async jwt({ token, user }) {
      // Saat user pertama kali login, ambil roles dari DB (user dari PrismaAdapter)
      if (user) {
        token.id = user.id;
        token.roles = user.roles;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.roles = token.roles as string;
      }
      return session;
    },
  },
});
