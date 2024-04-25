export type AdvertSongType = {
	guildId: string
	title: string
	path: string
	authorId: string
}

export type AdvertUserType = {
	id: string
	name: string
	guildId: string
}

export type AdvertGuildType = {
	id: string
	name: string
}

export type AdvertUserUpdateType = {
	id: string
	guildsId: string[]
}
