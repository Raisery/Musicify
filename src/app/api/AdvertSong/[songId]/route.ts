import { AdvertSongType } from '@/lib/AdvertTypes'
import prisma from '@/lib/prisma'
import { isRequestValid } from '@/lib/requestValidation'

export async function GET(request: Request, { params }: { params: { songId: string } }) {
	const songId = params.songId

	const songData = await prisma.advertSong.findUnique({
		where: {
			id: songId,
		},
	})
	return Response.json(songData)
}

export async function DELETE(request: Request, { params }: { params: { songId: string } }) {
	const songId = params.songId
	//request validation
	const apiToken = process.env.API_TOKEN as string
	const requestValidation = isRequestValid(request, apiToken)
	if (requestValidation.status.status !== 200)
		return Response.json(requestValidation.message, requestValidation.status)
	try {
		const song = await prisma.advertSong.delete({
			where: {
				id: songId,
			},
		})

		return Response.json({ message: 'Song deleted with success' }, { status: 202 })
	} catch (error) {
		return Response.json(error, { status: 400 })
	}
}
