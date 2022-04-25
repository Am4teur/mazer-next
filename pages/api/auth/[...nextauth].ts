import NextAuth from "next-auth";
import AppleProvider from "next-auth/providers/apple";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
//@ts-ignore
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  // @ts-ignore
  site: process.env.NEXTAUTH_URL,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      // @ts-ignore
      clientId: process.env.GOOGLE_ID,
      // @ts-ignore
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // Email & Password
    CredentialsProvider({
      id: "email-password",
      name: "Email & Password",
      async authorize(credentials, req) {
        // should very in DB by doing a call
        const user = {
          /* add function to get user */
        };

        console.log("inside authorize", credentials);

        return user;
      },
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Email Address",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
    }),
    // Passwordless, Only email
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: "Mazer <no-reply@mazer.com>",
    // }),
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD
    //     }
    //   },
    //   from: process.env.EMAIL_FROM
    // }),
  ],
  database: process.env.MONGODB_URI,
  //@ts-ignore
  adapter: MongoDBAdapter(clientPromise),
  strategy: "jwt",
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  pages: {
    signIn: "/auth/auth",
    // signOut: "/auth/signout",
    // error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
});
