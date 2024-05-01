import prisma from '@/lib/prisma'
import actionOnRequest from '@/lib/actionOnRequest'

export async function POST(request: Request) {
	return actionOnRequest(request, async body => {
		return await prisma.advertGuild.create({
			data: body,
		})
	})
}

export async function GET(request: Request) {
	return actionOnRequest(request, () => {
		return prisma.advertGuild.fields
	})
}
