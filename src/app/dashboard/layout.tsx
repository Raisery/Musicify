import prisma from '@/lib/prisma'
import { Advert, AdvertGuild, AdvertSong, AdvertUser } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authConfig } from '../../../pages/api/auth/[...nextauth]'
import GuildTile from '@/ui/guild/GuildTile'
import { Suspense } from 'react'
import Loading from '../../ui/loading/loading'
import { Guild } from 'discord.js'
import sleep from '@/lib/sleep'
import { fetchDiscordUserGuilds } from '@/lib/fetchDiscordAPI'

export default async function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await getServerSession(authConfig)
	if (!session) redirect('/')

	const user = (await prisma.advertUser.findUnique({
		where: {
			id: session.user.discordId,
		},
		include: {
			guilds: true,
			songs: true,
			adverts: true,
		},
	})) as AdvertUser & { guilds: AdvertGuild[]; songs: AdvertSong[]; adverts: Advert[] }
	const Guilds = [] as React.ReactNode[]
	if (!user) return 'ERROR'

	const discordUserGuilds = await fetchDiscordUserGuilds()
	if (!discordUserGuilds) return 'NO GUILDS FOUND'
	for (const advertGuild of user.guilds) {
		const guild = discordUserGuilds.find(g => g.id === advertGuild.id) as Guild
		Guilds.push(
			<Suspense fallback={<Loading />} key={advertGuild.id}>
				<GuildTile guild={guild} />
			</Suspense>
		)
	}

	return (
		<div className='w-ful h-full  p-6 flex gap-4' id='dashboard-layout'>
			<>
				<div className='w-1/3 bg-white/30 rounded-md p-2 overflow-hidden'>
					<div className='h-full min-h-screen overflow-y-auto overflow-x-hidden p-8 flex flex-col gap-3'>
						{Guilds}
					</div>
				</div>

				<div className='w-2/3 bg-white/30 rounded-md p-4 overflow-hidden'>{children}</div>
			</>
		</div>
	)
}
