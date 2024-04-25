import { isRequestValid } from '@/lib/requestValidation'
import { AdvertSongType } from '@/lib/AdvertTypes'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
	//request validation
	const apiToken = process.env.API_TOKEN as string
	const requestValidation = isRequestValid(request, apiToken)
	if (requestValidation.status.status !== 200)
		return Response.json(requestValidation.message, requestValidation.status)
	try {
		const body = (await request.json()) as AdvertSongType
		// Check if body properties are ok
		if (
			!body.authorId ||
			typeof body.authorId !== 'string' ||
			!body.guildId ||
			typeof body.guildId !== 'string' ||
			!body.path ||
			typeof body.path !== 'string' ||
			!body.title ||
			typeof body.title !== 'string'
		) {
			return Response.json({ message: 'Invalid body' }, { status: 400 })
		}

		// add an AdvertSong in the database
		const song = await prisma.advertSong.create({
			data: {
				authorId: body.authorId,
				guilId: body.guildId,
				title: body.title,
				path: body.path,
			},
		})

		return Response.json(song, { status: 200 })
	} catch (error) {
		return Response.json(error, { status: 400 })
	}
}
