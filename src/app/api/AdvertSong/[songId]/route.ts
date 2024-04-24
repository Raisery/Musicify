import prisma from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { songId: string } }) {
	const songId = params.songId

	const songData = await prisma.advertSong.findUnique({
		where: {
			id: songId,
		},
	})
	return Response.json(songData)
}
