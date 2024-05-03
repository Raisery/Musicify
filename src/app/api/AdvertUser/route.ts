import prisma from '@/lib/prisma'
import actionOnRequest from '@/lib/actionOnRequest'

export async function POST(request: Request) {
	return actionOnRequest(request, async body => {
		if (body.id) {
			return await prisma.advertUser.create({
				data: body,
			})
		} else return false
	})
}

export async function GET(request: Request) {
	return prisma.advertUser.fields
}
