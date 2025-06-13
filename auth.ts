import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async signIn({ user, account, profile }) {
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile?.id,
        });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: profile?.id,
          name: user.name,
          username: profile?.login,
          email: user.email,
          image: user.image,
          bio: profile?.bio || "",
        });
      }

      return true;
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: profile?.id,
          });

        if (!user) {
          token.id = null;
          token.accessToken = null;
        }

        token.accessToken = account.access_token;
        token.id = user?._id;
      }

      return token;
    },

    async session({ session, token }) {
      Object.assign(session, {
        id: token.id,
        accessToken: token.accessToken,
      });
      return session;
    },
  },
});
