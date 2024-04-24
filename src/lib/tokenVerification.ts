type isTokenValidParamsType = {
	authorization: string | null | undefined
	token: string | null | undefined
}

type isTokenValidReturnType = {
	message: { message: string }
	status: { status: number }
}

export function isTokenValid({ authorization, token }: isTokenValidParamsType): isTokenValidReturnType {
	if (!authorization) {
		return { message: { message: 'Missing token' }, status: { status: 401 } }
	}
	const authorizationToken = authorization.split(' ')
	if (authorizationToken[0] !== 'Bot' || !authorizationToken[1] || authorizationToken[1] !== token) {
		return { message: { message: 'Invalid token' }, status: { status: 401 } }
	}

	return { message: { message: 'Access granted' }, status: { status: 200 } }
}
