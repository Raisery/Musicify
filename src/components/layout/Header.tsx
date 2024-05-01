import Link from 'next/link'
import LinkButton from './SecondaryLinkButton'
import LoginButton from '../auth/LoginButton'
import { getServerSession } from 'next-auth'
import { authConfig } from '../../../pages/api/auth/[...nextauth]'
import UserMini from '../user/UserMini'
import { Jersey_25 } from 'next/font/google'

const Jersey = Jersey_25({
	weight: '400',
	subsets: ['latin'],
})
export default async function Header() {
	const session = await getServerSession(authConfig)
	return (
		<header className='flex items-center justify-between w-full h-20 p-4'>
			<Link className={Jersey.className + ' text-5xl opacity-50'} href={'/'}>
				Noble App
			</Link>
			<div className='flex gap-5 h-full justify-around items-center p-1'>
				<LinkButton href='/help'>Aide</LinkButton>
				{session ? <UserMini /> : <LoginButton />}
			</div>
		</header>
	)
}
