import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../../../lib/prisma";
import EmailProvider from "next-auth/providers/email";
import genActivationToken from "../../../../lib/api/mutation/activation/genActivationToken";
import generateProfile from "../../../../lib/profile/generateProfile";

// TODO: On signin check if the account is activated using one of the Redux helper functions.
// * If not take the user to the activation page.
// * If the user has not edited their profile since activation take them to the welcome page.

// Environment
const environment = process.env.NODE_ENV || "development";

const port: 465 | 587 = environment === "production" ? 465 : 587;

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    EmailProvider({
      server: {
        host: process.env.SMTP_SERVER_HOST,
        port: port,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    })
  ],
  session: {
    strategy: "database",
    maxAge: 2592000,
    updateAge: 7200
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    // error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/check-email", // (used for check email message)
    newUser: "/auth/welcome" // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   return true
    // },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },
    async session({ session, /*token,*/ user }) {
      session.user.role = user.role;
      session.user.id = user.id;
      session.user.username =
        user.username && typeof user.username === "string" ? user.username : "";
      session.user.bio =
        user.bio && typeof user.bio === "string" ? user.bio : "";

      delete session.user.image;

      return session;
    }
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   return token
    // }
  },
  events: {
    // async signIn(message) { /* on successful sign in */ },
    // async signOut(message) { /* on signout */ },
    async createUser(message) {
      const { id, email, name } = message.user;
      // * Generate activation token.
      genActivationToken(id);

      // * Generate username from email.
      const username = email.split("@")[0];

      generateProfile({ userId: id, name, username, bio: "" });
    }
    // async updateUser(message) { /* user updated - e.g. their email was verified */ },
    // async linkAccount(message) { /* account (e.g. Twitter) linked to a user */ },
    // async session(message) { /* session is active */ },
  },
  // logger: {
  //   error(code, metadata) {
  //     log.error(code, metadata)
  //   },
  //   warn(code) {
  //     log.warn(code)
  //   },
  //   debug(code, metadata) {
  //     log.debug(code, metadata)
  //   }
  // },
  debug: false
};

export default NextAuth(authOptions);
