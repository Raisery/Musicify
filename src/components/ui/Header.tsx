import Link from 'next/link';
import LinkButton from './LinkButton';
import LoginButton from '../auth/LoginButton';
import { getServerSession } from 'next-auth';
import { authConfig } from '../../../pages/api/auth/[...nextauth]';
import User from '../user/User';

export default async function Header() {
    const session = await getServerSession(authConfig);
    return (
        <header className="flex items-center justify-between w-full h-20 p-4">
            <Link href={'/'}>Discordify</Link>
            <div className="flex gap-5 h-full justify-around items-center">
                <LinkButton href="/help">Aide</LinkButton>
                {session ? <User /> : <LoginButton />}
            </div>
        </header>
    );
}
