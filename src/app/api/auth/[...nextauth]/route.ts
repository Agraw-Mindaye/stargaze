import NextAuth from "next-auth";
import type { NextAuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma"; // you'll create this file next
import { compare } from "bcryptjs";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) return null;
  
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
  
          if (!user || !user.password) return null;
  
          const isValid = await compare(credentials.password, user.password);
          if (!isValid) return null;
  
          return user;
        },
      }),
    ],
    session: {
      strategy: "database" as SessionStrategy
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/login", // you’ll create this page
    },
  };
  
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
