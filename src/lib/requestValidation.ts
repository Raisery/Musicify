import { NextApiRequest } from 'next'
import { headers } from 'next/headers'

type isTokenValidParamsType = {
	authorization: string | null | undefined
	apiToken: string | null | undefined
}

type requestValidationReturnType = {
	message: { message: string }
	status: { status: number }
}

export function isTokenValid({
	authorization,
	apiToken,
}: isTokenValidParamsType): requestValidationReturnType {
	if (!authorization) {
		return { message: { message: 'Missing token' }, status: { status: 401 } }
	}
	const authorizationToken = authorization.split(' ')
	if (authorizationToken[0] !== 'Bot' || !authorizationToken[1] || authorizationToken[1] !== apiToken) {
		return { message: { message: 'Invalid token' }, status: { status: 401 } }
	}

	return { message: { message: 'Access granted' }, status: { status: 200 } }
}

export function isRequestValid(request: Request, apiToken: string): requestValidationReturnType {
	// return error if there is no request
	if (!request) return { message: { message: 'no request' }, status: { status: 0 } }
	//token verification
	const authorization = headers().get('authorization')
	const tokenValidation = isTokenValid({ authorization, apiToken })
	if (tokenValidation.status.status !== 200) return tokenValidation
	//body verification
	const body = request.body
	if (!body) return { message: { message: 'Empty body' }, status: { status: 400 } }
	return { message: { message: 'Access granted' }, status: { status: 200 } }
}
