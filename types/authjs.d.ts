import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;        // pastikan id ikut kebawa juga
      roles: string;     // field tambahan dari Prisma
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    roles: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    roles: string;
  }
}
