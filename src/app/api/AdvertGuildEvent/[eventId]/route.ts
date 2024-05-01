import actionOnRequest from '@/lib/actionOnRequest'
import prisma from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { eventId: string } }) {
	const eventId = params.eventId
	return actionOnRequest(request, async () => {
		return await prisma.advertGuildEvent.findUnique({
			where: {
				id: eventId,
			},
		})
	})
}

export async function POST(request: Request, { params }: { params: { eventId: string } }) {
	const eventId = params.eventId
	return actionOnRequest(request, async body => {
		return await prisma.advertGuildEvent.update({
			where: {
				id: eventId,
			},
			data: body,
		})
	})
}

export async function DELETE(request: Request, { params }: { params: { eventId: string } }) {
	const eventId = params.eventId
	return actionOnRequest(request, async () => {
		return await prisma.advertGuildEvent.delete({
			where: {
				id: eventId,
			},
		})
	})
}
