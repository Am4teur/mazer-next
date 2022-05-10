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

        //
        //
        //
        // const client = await connect();
        // const usersCollection = client.db().collection("users");

        // const user = await usersCollection.findOne({
        //   email: credentials.email,
        // });

        // if (!user) {
        //   client.close();
        //   throw new Error("No user found!");
        // }

        // const isValid = bcrypt.compare(credentials.password, user.password);

        // if (!isValid) {
        //   client.close();
        //   throw new Error("Invalid password/email");
        // }
        // client.close();
        // return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        //token.user = user ? why not ? because of github google?
        token.user = {
          id: user.id,
          username: user.username,
          email: user.email,
          image: user.image,
          emailVerified: user.emailVerified,
          mazes: user.mazes,
        };
      }

      // github

      // google

      // loggedUser {
      //   _id: new ObjectId("62793c6f24fc69919966db86"),
      //   username: '123',
      //   email: 'fedahoj684@abincol.com',
      //   hashedPassword: '$2b$12$8DVf/V./hHweeb8LfHgQuuR6Ju5Xot76hFVkh0k0Y40jwXA6N9rYG',
      //   image: 'default_image',
      //   emailVerified: true,
      //   mazes: [],
      //   __v: 0
      // }

      return token;
    },

    async session({ session, token }: any) {
      session.user = token.user;
      return session;
    },
  },
});
