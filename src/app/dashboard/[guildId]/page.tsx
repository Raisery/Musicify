import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { Jersey_10, Jersey_25 } from 'next/font/google'
import { authConfig } from '../../../../pages/api/auth/[...nextauth]'
import PrimaryLinkButton from '@/ui/layout/PrimaryLinkButton'

const Jersey = Jersey_25({
	weight: '400',
	subsets: ['latin'],
})

const Jerseys = Jersey_10({
	weight: '400',
	subsets: ['latin'],
})

export default async function GuildPreview({ params }: { params: { guildId: string } }) {
	const session = await getServerSession(authConfig)
	const guildId = params.guildId
	const guild = await prisma.advertGuild.findUnique({
		where: {
			id: guildId,
		},
		include: {
			events: true,
			users: {
				where: {
					id: session?.user.id,
				},
				include: {
					adverts: {
						where: {
							guildId: guildId,
						},
					},
				},
			},
		},
	})

	const user = guild?.users[0]

	const onStream = guild?.events.find(event => event.name === 'START_STREAM')
	const offStream = guild?.events.find(event => event.name === 'CLOSE_STREAM')
	const onConnexion = user?.adverts[0]?.songId

	return (
		<div className='flex gap-4 w-full h-full'>
			<div className='w-full h-full bg-black/10 rounded-md'>
				<div className='flex flex-col h-full w-full items-center'>
					<h2
						className={
							Jersey.className +
							' text-4xl text-white/50 border-4 border-t-0 p-4 rounded-b-md border-white/20'
						}
					>
						{guild?.name}
					</h2>
					<div className='w-full h-full flex flex-col items-center justify-around '>
						<div
							className={
								Jerseys.className +
								' w-5/6 flex flex-col p-4 border-white/20 border-4 rounded-lg'
							}
						>
							<h3 className='text-3xl w-full text-center'>Paramètres serveur</h3>
							<p className='text-xl'>
								Son de début de stream : {onStream ? onStream.songId : 'AUCUN'}
							</p>
							<p className='text-xl'>
								Son de fin de stream : {offStream ? offStream.songId : 'AUCUN'}
							</p>
						</div>
						<div
							className={
								Jerseys.className +
								' w-5/6 flex flex-col p-4 border-white/20 border-4 rounded-lg'
							}
						>
							<h3 className='text-3xl w-full text-center'>Paramètres utilisateur</h3>
							<p className='text-xl'>
								Son de connexion : {onConnexion ? onConnexion : 'AUCUN'}
							</p>
							<p className='text-xl'>
								Son de deconnexion : {onConnexion ? onConnexion : 'AUCUN'}
							</p>
							<div className='w-1/4 self-center h-9'>
								<PrimaryLinkButton href={'./' + guildId + '/user-settings'}>
									Modifier
								</PrimaryLinkButton>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
