import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authConfig } from '../../../pages/api/auth/[...nextauth]';

export default async function Dashboard() {
    const session = await getServerSession(authConfig);
    if (!session) redirect('/');

    return <main className=""></main>;
}
