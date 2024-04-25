import { isRequestValid } from '@/lib/requestValidation'
import { AdvertSongType } from '@/lib/AdvertTypes'
import prisma from '@/lib/prisma'
import { Advert } from '@prisma/client'

export async function POST(request: Request) {
	//request validation
	const apiToken = process.env.API_TOKEN as string
	const requestValidation = isRequestValid(request, apiToken)
	if (requestValidation.status.status !== 200)
		return Response.json(requestValidation.message, requestValidation.status)
	try {
		const body = (await request.json()) as Advert
		// Check if body properties are ok
		if (
			!body.guildId ||
			typeof body.guildId !== 'string' ||
			!body.songId ||
			typeof body.songId !== 'string' ||
			!body.userId ||
			typeof body.userId !== 'string'
		) {
			return Response.json({ message: 'Invalid body' }, { status: 400 })
		}

		// add an AdvertSong in the database
		const advert = await prisma.advert.create({
			data: {
				guildId: body.guildId,
				songId: body.songId,
				userId: body.userId,
			},
			include: {
				guild: true,
				song: true,
				user: true,
			},
		})

		return Response.json(advert, { status: 200 })
	} catch (error) {
		return Response.json(error, { status: 400 })
	}
}
