import prisma from '@/lib/prisma'
import { isTokenValid } from '@/lib/requestValidation'
import { error } from 'console'
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

export async function DELETE(request: Request, { params }: { params: { guildId: string } }) {
	const guildId = params.guildId
	const authorization = headers().get('authorization')
	const requestValidation = isTokenValid({ authorization, apiToken })
	if (requestValidation.status.status !== 200)
		return Response.json(requestValidation.message, requestValidation.status)

	const guild = await prisma.advertGuild.delete({
		where: {
			id: guildId,
		},
	})
	console.log(guild)
	if (!guild) return Response.json({ message: 'Not Found' }, { status: 404 })
	return Response.json('Guild ' + guildId + ' deleted', { status: 202 })
}

export async function POST(request: Request, { params }: { params: { guildId: string } }) {
	const guildId = params.guildId
	const authorization = headers().get('authorization')
	const requestValidation = isTokenValid({ authorization, apiToken })
	if (requestValidation.status.status !== 200)
		return Response.json(requestValidation.message, requestValidation.status)

	let body
	try {
		body = await request.json()
		if (typeof body.name !== 'string') throw new Error('Invalid body')
	} catch (err) {
		return Response.json({ message: error }, { status: 400 })
	}

	const guild = await prisma.advertGuild.update({
		where: {
			id: guildId,
		},
		data: {
			name: body.name,
		},
	})
	console.log(guild)
	if (!guild) return Response.json({ message: 'Not Found' }, { status: 404 })
	return Response.json(guild, { status: 202 })
}
