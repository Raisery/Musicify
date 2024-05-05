import prisma from '@/lib/prisma'
import NewSongForm from '@/ui/layout/NewSongForm'
import { redirect } from 'next/navigation'

export default async function AddSong({ params }: { params: { guildId: string } }) {
	const { guildId } = params
	const guild = await prisma.guild.findUnique({
		where: { id: guildId },
	})

	if (!guild) redirect('/dashboard')

	return (
		<div className='h-full w-full flex flex-col bg-black/10 rounded-md items-center gap-20'>
			<h2
				className={
					' text-4xl text-white/50 border-4 border-t-0 p-4 rounded-b-md border-white/20'
				}
			>
				{guild?.name}
			</h2>
			<NewSongForm />
		</div>
	)
}
