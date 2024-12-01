/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  loginWithGoogle,
  signIn,
  loginWithFacebook,
} from "@/app/(auth)/_lib/service";
import { compare } from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

const authOptions: NextAuthOptions = {
  debug: true,
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user: any = await signIn(email);
        if (user) {
          const passwordConfirm = await compare(password, user.password);
          if (passwordConfirm) {
            return user;
          }
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.fullname = user.fullname;
        token.phone = user.phone;
        token.role = user.role;
      }
      if (account?.provider === "google" && user) {
        // Ambil nama lengkap dari profil pengguna Google
        const fullname = user.name || `${user.given_name} ${user.family_name}`; // Gabungkan given_name dan family_name jika tidak ada name

        const data = {
          fullname, // Nama lengkap
          email: user.email,
          role: "member", // Role default
          type: "google",
        };

        const firebaseUser = await loginWithGoogle(data);

        // Perbarui token dengan informasi pengguna dari Firebase
        token.email = firebaseUser?.email || data.email;
        token.fullname = firebaseUser?.fullname || fullname; // Gunakan fullname
        token.role = firebaseUser?.role || data.role;
      }
      if (account?.provider === "facebook" && user) {
        // Ambil nama lengkap dari profil pengguna Facebook
        const fullname = user.name || `${user.first_name} ${user.last_name}`;

        const data = {
          fullname, // Nama lengkap
          email: user.email,
          role: "member", // Role default
          type: "facebook",
        };

        const firebaseUser = await loginWithFacebook(data);

        // Perbarui token dengan informasi pengguna dari Firebase
        token.email = firebaseUser?.email || data.email;
        token.fullname = firebaseUser?.fullname || fullname;
        token.role = firebaseUser?.role || data.role;
      }
      return token;
    },

    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("fullname" in token) {
        session.user.fullname = token.fullname;
      }
      if ("phone" in token) {
        session.user.phone = token.phone;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
