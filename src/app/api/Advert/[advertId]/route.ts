import actionOnRequest from '@/lib/actionOnRequest'
import prisma from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { advertId: string } }) {
	const advertId = params.advertId
	return actionOnRequest(request, async () => {
		return await prisma.advertGuild.findUnique({
			where: {
				id: advertId,
			},
		})
	})
}

export async function POST(request: Request, { params }: { params: { advertId: string } }) {
	const advertId = params.advertId
	return actionOnRequest(request, async body => {
		return await prisma.advertGuild.update({
			where: {
				id: advertId,
			},
			data: body,
		})
	})
}

export async function DELETE(request: Request, { params }: { params: { advertId: string } }) {
	const advertId = params.advertId
	return actionOnRequest(request, async () => {
		return await prisma.advertGuild.delete({
			where: {
				id: advertId,
			},
		})
	})
}
