import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "nome@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials);

        const user = {
          id: 1,
          name: "lipe",
          email: "lipe@gmail.com",
          password: "123456",
        };

        if (
          credentials?.email === user.email &&
          credentials?.password === user.password
        ) {
          alert("logado");
          return user as any;
        } else {
          return null;
        }

        // const response = await fetch(
        //   `${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(credentials),
        //   }
        // );

        // const user = await response.json();

        // if (user?.jwt) {
        //   return user;
        // } else {
        //   return null;
        // }
      },
    }),
  ],
};

export default options;
