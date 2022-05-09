import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import { compare } from "bcrypt";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth",
    // signOut: "/auth/signout",
    // error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  debug: process.env.NODE_ENV === "development",
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
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Email Address",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        await dbConnect();
        console.log("credentials", credentials);

        //Find user with the email
        const loggedUser = await User.findOne({
          email: credentials?.email,
        });
        //Not found - send error res
        if (!loggedUser) {
          throw new Error("No user found with the email");
        }
        //Check hased password with DB password
        const checkPassword = await compare(
          credentials!.password,
          loggedUser.hashedPassword
        );
        //Incorrect password - send response
        if (!checkPassword) {
          throw new Error("Password doesnt match");
        }
        console.log("loggedUser", loggedUser);
        return loggedUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      //credentials
      if (user) {
        token.id = user.username;
      }

      return token;
    },

    async session({ session, token }: any) {
      if (token) {
        session.id = token.id;
        session.g = "g";
      }

      return session;
    },
  },
});
