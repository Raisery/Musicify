import prisma from '@/lib/prisma'
import { isTokenValid } from '@/lib/requestValidation'
import { headers } from 'next/headers'
const apiToken = process.env.API_TOKEN as string

export async function GET(request: Request, { params }: { params: { guildId: string } }) {
	const guildId = params.guildId
	const authorization = headers().get('authorization')
	const requestValidation = isTokenValid({ authorization, apiToken })
	if (requestValidation.status.status !== 200)
		return Response.json(requestValidation.message, requestValidation.status)

	const guild = await prisma.advertGuild.findUnique({
		where: {
			id: guildId,
		},
		include: {
			users: true,
			songs: true,
			adverts: true,
		},
	})
	console.log(guild)
	if (!guild) return Response.json({ message: 'Not Found' }, { status: 404 })
	return Response.json(guild)
}
