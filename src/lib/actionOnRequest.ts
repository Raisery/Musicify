import { isRequestValid } from './requestValidation'

export default async function actionOnRequest(request: Request, execute: (body: any) => object) {
	const apiToken = process.env.API_TOKEN as string
	const requestValidation = isRequestValid(request, apiToken)
	if (requestValidation.status.status !== 200)
		return Response.json(requestValidation.message, requestValidation.status)
	let body
	if (request.method === 'POST') {
		try {
			body = await request.json()
		} catch (error) {
			return Response.json({ message: 'Invalid body form', body: body }, { status: 400 })
		}
	}
	try {
		const res = await execute(body)
		return Response.json(res, { status: 200 })
	} catch (error: any) {
		if (error.name === 'PrismaClientValidationError')
			return Response.json({ message: 'Invalid body', body: body }, { status: 400 })
		return Response.json(error, { status: 500 })
	}
}
