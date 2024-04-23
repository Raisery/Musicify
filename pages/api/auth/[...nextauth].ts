import prisma from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import Discord from 'next-auth/providers/discord';

const discordId = process.env.DISCORD_CLIENT_ID;
const discordSecret = process.env.DISCORD_CLIENT_SECRET;

if (!discordId || !discordSecret) {
    throw new Error(
        'Missing DISCORD_ID or DISCORD_CLIENT environnement variable'
    );
}

export const authConfig = {
    providers: [
        Discord({
            clientId: discordId,
            clientSecret: discordSecret,
            authorization: {
                params: { scope: 'identify guilds connections' },
            },
        }),
    ],
    adapter: PrismaAdapter(prisma) as Adapter,
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    callbacks: {
        async jwt({ token, account, user }) {
            token.accessToken = account?.access_token;
            return { ...token, ...user, ...account };
        },
        async session({ session, token, user }) {
            if (token.access_token) {
                session.user.token = token.access_token as string;
            }
            return session;
        },
        async signIn({ user, account }) {
            if (user) {
                return true;
            }
            return '/unauthorized';
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith('/')) return `${baseUrl}${url}`;
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
    },
} satisfies NextAuthOptions;

export default NextAuth(authConfig);
