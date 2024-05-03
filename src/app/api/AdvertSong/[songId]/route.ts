import actionOnRequest from '@/lib/actionOnRequest'
import prisma from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { songId: string } }) {
	const songId = params.songId

	return actionOnRequest(request, async () => {
		return await prisma.advertSong.findUnique({
			where: {
				id: songId,
			},
			include: {
				author: true,
				guild: true,
				adverts: true,
				events: true,
			},
		})
	})
}

export async function POST(request: Request, { params }: { params: { songId: string } }) {
	const songId = params.songId

	return actionOnRequest(request, async body => {
		return await prisma.advertSong.update({
			where: {
				id: songId,
			},
			data: body,
		})
	})
}

export async function DELETE(request: Request, { params }: { params: { songId: string } }) {
	const songId = params.songId

	return actionOnRequest(request, async () => {
		return await prisma.advertSong.delete({
			where: {
				id: songId,
			},
		})
	})
}
