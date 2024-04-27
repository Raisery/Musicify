import { getServerSession } from 'next-auth'
import { authConfig } from '../../pages/api/auth/[...nextauth]'
import Link from 'next/link'
import LinkButton from '@/components/ui/LinkButton'

export default async function Home() {
	const session = await getServerSession(authConfig)
	return (
		<main className=''>
			<LinkButton href='https://discord.com/oauth2/authorize?client_id=1230499719172591696&permissions=8&scope=bot'>
				Invite the bot !
			</LinkButton>
		</main>
	)
}
