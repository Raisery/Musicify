import { isRequestValid } from '@/lib/requestValidation'
import { AdvertGuildType } from '@/lib/AdvertTypes'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
	//request validation
	const apiToken = process.env.API_TOKEN as string
	const requestValidation = isRequestValid(request, apiToken)
	if (requestValidation.status.status !== 200)
		return Response.json(requestValidation.message, requestValidation.status)
	let body
	try {
		body = (await request.json()) as AdvertGuildType
		// Check if body properties are ok
	} catch (error) {
		console.error(error)
		return Response.json({ message: 'Invalid body' }, { status: 400 })
	}
	if (!body.id || typeof body.id !== 'string' || !body.name || typeof body.name !== 'string') {
		return Response.json({ message: 'Invalid body (wrong properties)' }, { status: 400 })
	}

	//code to add an AdvertSong in the BDD
	try {
		const guild = await prisma.advertGuild.create({
			data: {
				name: body.name,
				id: body.id,
			},
		})
		return Response.json({ message: 'Guild Created', guild }, { status: 201 })
	} catch (error) {
		console.error(error)
		return Response.json(
			{ message: 'Cannot create the guild in the database (already created?)' },
			{ status: 500 }
		)
	}
}
