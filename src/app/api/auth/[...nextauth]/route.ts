import { NextAuthOptions } from "next-auth";

import { comparePassword } from "@/lib/utils";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../../lib/prisma";
import NextAuth from "next-auth/next";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        // ambil data satu
        const user = await prisma.company.findFirst({
          // dimana email itu sama dengan email credential
          where: {
            email: credentials?.email,
          },
        });

        // klo usernya gada return null
        if (!user) {
          return null;
        }

        const isMatch = await comparePassword(
          // ambil passwordnya dari credential dan hash passwordnya ambil dari user.password
          credentials?.password!!,
          user.password
        );

        // jika match return user
        if (isMatch) {
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/signup",
  },
  // tambahkan callbacks untuk nambahin id karna session yg di simpan di next auth yg di simpan cuma email dan nama
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token, user }) {
      session.user.id = token.id;

      return session;
    },
  },
};

// export
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
