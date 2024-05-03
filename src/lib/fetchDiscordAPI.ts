import { Guild } from 'discord.js'
import { getServerSession } from 'next-auth'
import { authConfig } from '../../pages/api/auth/[...nextauth]'

const nobleToken = process.env.DISCORD_BOT_TOKEN_NOBLEBOT

export async function fetchDiscordGuild(id: string): Promise<Guild | null> {
	if (!nobleToken) throw new Error('DISCORD_BOT_TOKEN_NOBLE is not defined in .env file !')
	const data = await fetch('https://discord.com/api/guilds/' + id, {
		headers: { authorization: nobleToken },
	})

	const guild = await data.json()
	if (!guild.id) return null
	return guild
}

export async function fetchDiscordUserGuilds(): Promise<Guild[] | null> {
	const session = await getServerSession(authConfig)
	if (!session) throw new Error('User not logged with discord account !')

	const data = await fetch('https://discord.com/api/users/@me/guilds', {
		headers: { authorization: 'Bearer ' + session.user.token },
	})

	const guilds = await data.json()

	if (!guilds[0]) return null
	return guilds
}

export async function fetchDiscordNobleGuilds(): Promise<Guild[] | null> {
	if (!nobleToken) throw new Error('DISCORD_BOT_TOKEN_NOBLE is not defined in .env file !')

	const data = await fetch('https://discord.com/api/users/@me/guilds', {
		headers: { authorization: nobleToken },
	})

	const guilds = await data.json()
	if (!guilds[0]) return null
	return guilds
}
