import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connect from "@/app/utils/db";
import User from "@/app/models/User";
import bcript from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcript.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (err) {
          console.log("err", err);
          return null;
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    // async signIn({ user, account }) {
    //   if (account?.provider == "credentials") {
    //     return true;
    //   }
    //   if (account?.provider == "github") {
    //     return connect();
        // try {
        //   const existingUser = await User.findOne({ email: user?.email });
        //   if (!existingUser) {
        //     const newUser = new User({
        //       email: user.email,
        //     });
        //     await newUser.save();
        //     return true;
        //   }
        // } catch (err) {
        //   console.log(err);
        //   return false;
        // }
    //   }
    // }
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  // pages: { signIn: "/register" },
});

export { handler as GET, handler as POST };
