import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authConfig } from '../../../pages/api/auth/[...nextauth]'
import prisma from '@/lib/prisma'
import GuildPreview from '@/components/guild/GuildPreview'

export default async function Dashboard() {
	const session = await getServerSession(authConfig)
	if (!session) redirect('/')
	const user = await prisma.advertUser.findUnique({
		where: {
			id: session.user.discordId,
		},
		include: {
			guilds: true,
		},
	})
	const userGuilds = user?.guilds

	const Guilds = []
	if (userGuilds) {
		for (const guild of userGuilds) {
			Guilds.push(<GuildPreview guildId={guild.id} key={guild.id} />)
		}
	}

	return (
		<div className='flex gap-4 w-full h-full'>
			<div className='w-1/3 h-full bg-white/30 rounded-md overflow-y-auto p-4 flex flex-col gap-3'>
				{Guilds}
			</div>
			<div className='w-2/3 bg-white/30 rounded-md'></div>
		</div>
	)
}
