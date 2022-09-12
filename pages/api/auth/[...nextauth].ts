import dbConnect from "@/lib/dbConnect";
import clientPromise from "@/lib/mongodb";
import User from "@/models/User";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_ID = process.env.GOOGLE_ID
  ? process.env.GOOGLE_ID
  : "WRONG_GOOGLE_ID";
const GOOGLE_SECRET = process.env.GOOGLE_SECRET
  ? process.env.GOOGLE_SECRET
  : "WRONG_GOOGLE_SECRET";
const GITHUB_ID = process.env.GITHUB_ID
  ? process.env.GITHUB_ID
  : "WRONG_GITHUB_ID";
const GITHUB_SECRET = process.env.GITHUB_SECRET
  ? process.env.GITHUB_SECRET
  : "WRONG_GITHUB_SECRET";

export const authOptions: any = {
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
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
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
        // user = {
        //   score: 0,
        //   _id: new ObjectId("62754c1afac16fc8b56cf4e0"),
        //   username: 'asd',
        //   email: 'sidir63815@angeleslid.com',
        //   hashedPassword: '$2b$12$wgJC/0zUknDrWZrEXmwJZuX8j2vKpTA2Ij/xhsWdLGJDJj4iM7TN.',
        //   image: 'default_image',
        //   emailVerified: false,
        //   mazes: [],
        //   __v: 0
        // }
      };

      const updateNewUser = async (user: any) => {
        await dbConnect();

        const filter = { email: user.email };
        const update = {
          id: user._id,
          username: user.username,
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
        // token = {
        //   id: '629e00d21ad5de305920b9cc',
        //   name: 'Daniel Castro',
        //   email: 'daniel.7c.n12@gmail.com',
        //   image: 'https://avatars.githubusercontent.com/u/20971226?v=4',
        //   emailVerified: true,
        //   mazes: [],
        //   score: 0,
        //   username: 'Daniel Castro'
        // }

        return token;
      };

      // this is between an email (getOldUser) and a provider (updateNewUser)
      if (user) token = user?.username ? getOldUser(user) : updateNewUser(user);

      return token;
    },

    async session({ session, token }: any) {
      console.log("session", session, token);

      session.user = token.user;
      return session;
    },
  },
};

export default NextAuth(authOptions);
