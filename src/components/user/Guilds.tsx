import { GuildType } from '@/lib/discordTypes';
import Image from 'next/image';

type GuildProps = {
    guild: GuildType;
};

export default function Guild({ guild }: GuildProps) {
    return (
        <div>
            <p>{guild.name}</p>
            <Image
                src={
                    'https://cdn.discordapp.com/icons/' +
                    guild.id +
                    '/' +
                    guild.icon +
                    '.png'
                }
                alt="Server icon"
                width={60}
                height={60}
            />
        </div>
    );
}
