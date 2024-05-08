'use server'
import { File } from 'buffer'
import fs from 'fs'
import prisma from '../prisma'

export async function createSong(prevState: any, formData: FormData) {
	const data = {
		title: formData.get('title'),
		artist: formData.get('artist'),
		file: formData.get('audioFile'),
		userId: formData.get('userId'),
		guildId: formData.get('guildId'),
		duration: formData.get('duration'),
	}
	const duration = (data.duration as unknown as number) * 1000
	// Test it out:
	const file = data.file as unknown as File
	const fileBuffer = await file.arrayBuffer()

	const potentialSimilarSongs = await prisma.song.findMany({
		where: {
			duration: new Date(duration),
			guildId: data.guildId as string,
		},
	})
	console.log(potentialSimilarSongs)
	let isDuplicate = false
	for (const similarSong of potentialSimilarSongs) {
		const similarBuffer = fs.readFileSync('../Storage/' + similarSong.id + '.mp3')
		if (similarBuffer.compare(Buffer.from(fileBuffer)) === 0) {
			isDuplicate = true
		}
	}
	if (isDuplicate) {
		return { message: 'Duplicate file detected' }
	}
	const song = await prisma.song.create({
		data: {
			title: data.title as string,
			duration: new Date(duration),
			authorId: data.userId as string,
			guildId: data.guildId as string,
			artist: data.artist as string,
		},
	})

	fs.writeFileSync('../Storage/' + song.id + '.mp3', Buffer.from(fileBuffer))

	return { message: 'Success' }
}
