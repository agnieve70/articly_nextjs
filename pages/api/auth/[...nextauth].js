import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { verifyPassword } from "../../../helpers/auth-utils";
import { connectDatabase } from "../../../helpers/db-util";

export default NextAuth({
  session: {
    jwt: true,
  },
  callbacks: {
    async session(session, token) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      if (user) {
        token.accessToken = user._id;
        token.user = user;
      }
      return token;
    },
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectDatabase();

        const userCollection = client.db().collection("users");

        const user = await userCollection.findOne(
          {
            email: credentials.email,
          },
          {
            name: 1,
            email: 1,
            _id: 1,
            confirmation_code: 0,
          }
        );

        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Could not log you in!");
        }

        if (user.confirmation_code !== 0) {
          throw new Error("Please Confirm Email");
        }

        client.close();

        return user;
      },
    }),
  ],
});
