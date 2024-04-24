import { isTokenValid } from '@/lib/tokenVerification'
import { NextApiRequest } from 'next'
import { headers } from 'next/headers'

export async function POST(request: NextApiRequest) {
	const authorization = headers().get('authorization')
	const token = process.env.API_TOKEN
	const tokenVerif = isTokenValid({ authorization, token })
	if (tokenVerif.status.status !== 200) return Response.json(tokenVerif.message, tokenVerif.status)
	const body = request.body
	if (!body) return Response.error().statusText
	const bodyReader = body.getReader()
	const data = await bodyReader.read()
	if (!data.value) {
		return Response.json({ message: 'Bad body request' }, { status: 400 })
	}
	return Response.json({ message: 'cool' }, { status: 200 })
}
