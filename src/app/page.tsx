import { getServerSession } from 'next-auth';
import { authConfig } from '../../pages/api/auth/[...nextauth]';

export default async function Home() {
    const session = await getServerSession(authConfig);
    return <main className="">{session?.user.token}</main>;
}
