import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
// import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";
import { compare } from "bcrypt";

export default NextAuth({
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
      async authorize(credentials, req) {
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
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("!user", user);
      console.log("!account", account);

      //if github or google in account.provider
      //DB users collection lookup
      //if not => put data into db
      //if yes => nothing

      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        return false;
      }
    },
    async jwt({ token, user }: any) {
      console.log("!user", user);
      console.log("!token", token);

      //credentials
      if (user) {
        token.id = user.username;
      }
      //github or google
      else {
        token.id = user.username;
      }

      return token;
    },

    async session({ session, token, user }: any) {
      console.log("!session", session);
      console.log("!token", token);
      console.log("!user", user);

      //same logic of jwt callback with if(user)
      if (token) {
        session.id = token.id;
        session.g = "g";
      }

      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
});
