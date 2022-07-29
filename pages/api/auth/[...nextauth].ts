import dbConnect from "@/lib/dbConnect";
import clientPromise from "@/lib/mongodb";
import User from "@/models/User";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_ID = process.env.GOOGLE_ID ? process.env.GOOGLE_ID : "WRONG_ID";
const GOOGLE_SECRET = process.env.GOOGLE_SECRET
  ? process.env.GOOGLE_SECRET
  : "WRONG_SECRET";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
    maxAge: 2 * 24 * 60 * 60,
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
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
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

        // Find user with the email
        const user = await User.findOne({
          email: credentials?.email,
        });

        // Email Not found
        if (!user) {
          throw new Error("Email is not registered");
        }

        // Check hased password with DB hashed password
        const isPasswordCorrect = await compare(
          credentials!.password,
          user.hashedPassword
        );

        // Incorrect password
        if (!isPasswordCorrect) {
          throw new Error("Password is incorrect");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, profile, account }: any) {
      console.log("jwt", user, account, profile, token);

      const getOldUser = (user: any) => {
        token.user = user;
        return token;
      };

      const updateNewUser = async (user: any) => {
        await dbConnect();

        const filter = { email: user.email };
        const update = {
          username: user.name,
          email: user.email,
          image: user.image,
          emailVerified: true,
          mazes: user.mazes || [],
          score: user.score || 0,
          // type: account.provider,
        };

        await User.findOneAndUpdate(filter, update, {
          new: true,
        });

        //update token
        token.user = {
          id: user.id,
          username: user.username || user.name,
          email: user.email,
          image: user.image,
          emailVerified: user.emailVerified,
          mazes: user.mazes || [],
          score: user.score || 0,
        };

        return token;
      };

      if (user) {
        token = user?.username ? getOldUser(user) : updateNewUser(user);
      }

      return token;
    },

    async session({ session, token }: any) {
      console.log("session", session, token);

      session.user = token.user;
      return session;
    },
  },
});
