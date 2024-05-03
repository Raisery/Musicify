import { Advert, AdvertGuild, AdvertSong, AdvertUser } from '@prisma/client'

export type AdvertUserFull = AdvertUser & {
	guilds: AdvertGuild[]
	songs: AdvertSong[]
	adverts: Advert[]
}
export type AdvertGuildFull = AdvertGuild & { adverts: Advert[] }
