import NextAuth, { AuthOptions } from "next-auth";
import CredentailsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import prisma from "../../../libs/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentailsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid Credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            emailAddress: credentials.email,
          },
        });

        if (!user) {
          throw new Error("Invalid Credentials");
        }

        const isCorrectPassword = credentials.password === user.password;

        if (!isCorrectPassword) {
          throw new Error("Invalid Credentials");
        }

        return { id: user.id, email: user.emailAddress, role: user.role };
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
