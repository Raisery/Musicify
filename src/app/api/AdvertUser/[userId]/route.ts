import actionOnRequest from '@/lib/actionOnRequest'
import prisma from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { userId: string } }) {
	const { userId } = params
	return actionOnRequest(request, async () => {
		return await prisma.advertUser.findUnique({
			where: {
				id: userId,
			},
			include: {
				adverts: true,
				guilds: true,
				songs: true,
			},
		})
	})
}

export async function POST(request: Request, { params }: { params: { userId: string } }) {
	const { userId } = params
	return actionOnRequest(request, async body => {
		return await prisma.advertUser.update({
			where: {
				id: userId,
			},
			data: body,
		})
	})
}

export async function DELETE(request: Request, { params }: { params: { userId: string } }) {
	const { userId } = params
	return actionOnRequest(request, async () => {
		return await prisma.advertUser.delete({
			where: {
				id: userId,
			},
		})
	})
}
