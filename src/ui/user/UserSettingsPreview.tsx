import { EventType } from '@/lib/definition'
import prisma from '@/lib/prisma'
import PrimaryLinkButton from '../layout/PrimaryLinkButton'

export default async function UserSettingsPreview({
	userId,
	guildId,
}: {
	userId: string
	guildId: string
}) {
	const userEvents = await prisma.userVoiceEvent.findMany({
		where: {
			guildId: guildId,
			userId: userId,
		},
		include: {
			song: true,
		},
	})

	const openStream = userEvents.find(event => event.type === EventType.OPEN_STREAM)
	const closeStream = userEvents.find(event => event.type === EventType.CLOSE_STREAM)
	const onConnection = userEvents.find(event => event.type === EventType.CONNECTION)
	const onDeconnection = userEvents.find(event => event.type === EventType.DECONNECTION)
	return (
		<div
			className={
				' w-5/6 flex flex-col gap-3 p-4 px-8 border-white/20 border-4 rounded-lg text-2xl items-center'
			}
		>
			<h3 className='text-4xl w-full text-center'>Paramètres utilisateur</h3>
			<div className='flex justify-between w-full'>
				<p>Son de début de stream : </p>
				<div>{openStream ? openStream.songId : 'AUCUN'}</div>
			</div>
			<div className='flex justify-between w-full'>
				<p>Son de fin de stream : </p>
				<div>{closeStream ? closeStream.songId : 'AUCUN'}</div>
			</div>
			<div className='flex justify-between w-full'>
				<p>Son de connexion : </p>
				<div>{onConnection ? onConnection.songId : 'AUCUN'}</div>
			</div>
			<div className='flex justify-between w-full'>
				<p>Son de deconnexion : </p>
				<div>{onDeconnection ? onDeconnection.songId : 'AUCUN'}</div>
			</div>
			<div className=' h-10 w-2/5'>
				<PrimaryLinkButton href={'/dashboard/user-settings/' + guildId}>
					Modifier
				</PrimaryLinkButton>
			</div>
		</div>
	)
}
