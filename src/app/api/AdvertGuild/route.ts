import prisma from '@/lib/prisma'
import actionOnRequest from '@/lib/actionOnRequest'
import delay from '@/lib/sleep'

export async function POST(request: Request) {
	return actionOnRequest(request, async body => {
		await delay(2000)
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
