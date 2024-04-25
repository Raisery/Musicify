import prisma from '@/lib/prisma'
import { isTokenValid } from '@/lib/requestValidation'
import { headers } from 'next/headers'
const apiToken = process.env.API_TOKEN as string

export async function GET(request: Request, { params }: { params: { advertId: string } }) {
	const advertId = params.advertId
	const authorization = headers().get('authorization')
	const requestValidation = isTokenValid({ authorization, apiToken })
	if (requestValidation.status.status !== 200)
		return Response.json(requestValidation.message, requestValidation.status)

	const advert = await prisma.advert.findUnique({
		where: {
			id: advertId,
		},
		include: {
			user: true,
			song: true,
			guild: true,
		},
	})
	if (!advert) return Response.json({ message: 'Not Found' }, { status: 404 })
	return Response.json(advert, { status: 201 })
}

export async function DELETE(request: Request, { params }: { params: { advertId: string } }) {
	const advertId = params.advertId
	const authorization = headers().get('authorization')
	const requestValidation = isTokenValid({ authorization, apiToken })
	if (requestValidation.status.status !== 200)
		return Response.json(requestValidation.message, requestValidation.status)

	try {
		const advert = await prisma.advert.delete({
			where: {
				id: advertId,
			},
		})
		return Response.json({ message: 'Advert successfully deleted' }, { status: 202 })
	} catch (error) {
		return Response.json(error, { status: 400 })
	}
}
