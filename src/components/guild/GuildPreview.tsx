import Image from 'next/image'
import defaultIcon from '../../../public/discordgrey.png'
import BOT from '@/lib/bot'

type GuildProps = {
	guildId: string
}

export default async function GuildPreview({ guildId }: GuildProps) {
	const guild = await BOT.getGuildPreviewFromId(guildId)
	return (
		<div className='flex h-[10%] gap-3 items-center w-full px-10 bg-black/15 rounded-md hover:bg-[#8729B3]/20 hover:pl-20'>
			{guild.icon ? (
				<Image
					src={'https://cdn.discordapp.com/icons/' + guild.id + '/' + guild.icon + '.png'}
					alt='Server icon'
					width={60}
					height={60}
				/>
			) : (
				<Image
					src={defaultIcon}
					alt='Default icon'
					width={60}
					height={60}
					className=' rounded-full'
				/>
			)}
			<p>{guild.name}</p>
			
		</div>
	)
}
