import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { serverURL } from "@/config";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "nome@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const response = await fetch(`${serverURL}/api/auth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        const user = await response.json()
        if (response.ok && user) {
          return user;
        }
          
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      const response = await fetch(
        `${serverURL}/api/auth?email=${token.email}`, {
        method: "GET", headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      session.user = data;

      return session;
    },
  },
  pages: {
    signIn: "/auth/signIn",
    // signOut: "/auth/signout",
    // error: "/auth/error",
    // verifyRequest: "/auth/verify-request",
    // newUser: "/auth/new-user",
  },
};

export default options;
