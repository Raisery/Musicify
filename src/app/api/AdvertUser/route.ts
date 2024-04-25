import { isRequestValid } from '@/lib/requestValidation'
import { AdvertUserType } from '@/lib/AdvertTypes'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
	//request validation
	const apiToken = process.env.API_TOKEN as string
	const requestValidation = isRequestValid(request, apiToken)
	if (requestValidation.status.status !== 200)
		return Response.json(requestValidation.message, requestValidation.status)
	let body
	try {
		body = (await request.json()) as AdvertUserType
		// Check if body properties are ok
	} catch (error) {
		console.error(error)
		return Response.json({ message: 'Invalid body' }, { status: 400 })
	}
	if (
		!body.id ||
		typeof body.id !== 'string' ||
		!body.name ||
		typeof body.name !== 'string' ||
		!body.guildId ||
		typeof body.guildId !== 'string'
	) {
		return Response.json({ message: 'Invalid body (wrong properties)' }, { status: 400 })
	}

	//code to add an AdvertUser in the database
	try {
		const user = await prisma.advertUser.create({
			data: {
				name: body.name,
				id: body.id,
				guilds: {
					connect: {
						id: body.guildId,
					},
				},
			},
		})
		return Response.json({ message: 'User Created', user }, { status: 201 })
	} catch (error) {
		console.error(error)
		return Response.json(
			{ message: 'Cannot create the user in the database (maybe already created or missing guild)' },
			{ status: 500 }
		)
	}
}
