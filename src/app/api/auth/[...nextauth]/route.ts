import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    id_token?: string;
  }
}

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id_token = account.id_token; // <-- you'll send this to ASP.NET
      }
      console.log("JWT Callback: new", token);
      return token;
    },
    async session({ session, token }) {
      session.id_token =
        typeof token.id_token === "string" ? token.id_token : undefined;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
