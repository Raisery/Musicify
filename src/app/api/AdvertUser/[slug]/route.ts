import { AdvertUserUpdateType } from '@/lib/AdvertTypes'
import prisma from '@/lib/prisma'
import { isRequestValid } from '@/lib/requestValidation'

export async function GET(request: Request, { params }: { params: { slug: string } }) {
	const slug = params.slug
	const user = await prisma.advertUser.findUnique({
		where: {
			id: slug,
		},
		include: {
			guilds: true,
			songs: true,
			adverts: true,
		},
	})
	//
	return Response.json(user)
}

export async function POST(request: Request, { params }: { params: { slug: string } }) {
	const slug = params.slug

	//request validation
	const apiToken = process.env.API_TOKEN as string
	const requestValidation = isRequestValid(request, apiToken)
	if (requestValidation.status.status !== 200)
		return Response.json(requestValidation.message, requestValidation.status)
	let body
	try {
		body = (await request.json()) as AdvertUserUpdateType
		// Check if body properties are ok
	} catch (error) {
		console.error(error)
		return Response.json({ message: error }, { status: 400 })
	}
	if (!body.id || typeof body.id !== 'string' || !body.guildsId || typeof body.guildsId[0] !== 'string') {
		return Response.json({ message: 'Invalid body (wrong properties)' }, { status: 400 })
	}

	//code to add an AdvertUser in the database
	try {
		let user
		for (const guildId of body.guildsId) {
			user = await prisma.advertUser.update({
				data: {
					guilds: {
						connect: {
							id: guildId,
						},
					},
				},
				where: {
					id: slug,
				},
			})
		}

		return Response.json({ message: 'User Updated', user }, { status: 201 })
	} catch (error) {
		console.error(error)
		return Response.json({ message: error }, { status: 500 })
	}
}
