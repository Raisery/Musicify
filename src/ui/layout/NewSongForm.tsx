'use client'

import { FormEvent } from 'react'

export default function NewSongForm() {
	async function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		const response = await fetch('/api/addsong', {
			method: 'POST',
			body: formData,
		})

		// Handle response if necessary
		const data = await response.json()
		// ...
	}

	return (
		<form
			onSubmit={onSubmit}
			className=' flex flex-col border-4 border-white/30 rounded-lg w-2/3 p-4 gap-10'
		>
			<label htmlFor='title'>Titre :</label>
			<input type='text' id='title' className='text-black p-2' />
			<label htmlFor='title'>Artiste :</label>
			<input type='text' id='title' className='text-black p-2' />
			<label htmlFor='file'>Son :</label>
			<input type='file' name='file' id='file' />
			<input type='submit' value={'Enregistrer'} className='' />
		</form>
	)
}
