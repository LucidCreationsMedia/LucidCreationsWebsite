import { Role } from "@prisma/client";
// import { JWT } from "next-auth/jwt";

// declare module "next-auth/jwt" {
//   /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
//   interface JWT {
//     /** OpenID ID Token */
//     idToken?: string;
//   }
// }

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      name?: string;
      username?: string;
      bio?: string;
      email?: string;
      image?: string;
      role: Role;
    };
  }
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    name?: string;
    email?: string;
    image?: string;
    role: Role;
    username?: string;
    bio?: string;
  }
  /**
   * Usually contains information about the provider being used
   * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
   */
  // interface Account {}
  /** The OAuth profile returned from your provider */
  // interface Profile {}
}
