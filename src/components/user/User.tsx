import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { authConfig } from '../../../pages/api/auth/[...nextauth]';
import LogoutButton from '../auth/LogoutButton';
import LinkButton from '../ui/LinkButton';

export default async function User() {
    const session = await getServerSession(authConfig);
    if (!session) return;
    if (!session.user.image)
        session.user.image = 'https://cdn.discordapp.com/embed/avatars/0.png';
    return (
        <div className="flex gap-2 justify-center items-center p-1 h-full">
            <Image
                src={session.user.image}
                width={40}
                height={40}
                alt="user avatar"
                className="rounded-full"
            />
            <p>{session.user.name}</p>
            <LinkButton href="/dashboard">Dashboard</LinkButton>
            <LogoutButton />
        </div>
    );
}
