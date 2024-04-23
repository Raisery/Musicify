import { GuildType } from '@/lib/discordTypes';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authConfig } from '../../../pages/api/auth/[...nextauth]';
import Guild from '@/components/user/Guilds';
import prisma from '@/lib/prisma';

export default async function Dashboard() {
    const session = await getServerSession(authConfig);
    if (!session) redirect('/');

    const guildsData = await fetch('https://discord.com/api/users/@me/guilds', {
        headers: {
            authorization: 'Bearer ' + session.user.token,
        },
    });

    const guilds = (await guildsData.json()) as GuildType[];
    const allowedGuilds = [] as GuildType[];
    const botGuilds = await prisma.guilds.findUnique({
        where: {
            guildId: '662641634076393492',
        },
    });

    guilds.forEach((guild) => {
        if (botGuilds?.guildId === guild.id) allowedGuilds.push(guild);
    });

    return (
        <main className="">
            {allowedGuilds.map((server) => {
                console.log(server.name);
                return <Guild guild={server} key={server.id} />;
            })}
        </main>
    );
}
