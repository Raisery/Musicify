import type { Metadata } from 'next'
import { Inter, Jersey_25 } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'

export const metadata: Metadata = {
	title: 'Discordify',
	description: 'Web interface to manage the Discordify bot on your server',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='fr'>
			<body className={'w-screen h-screen p-8'}>
				<main
					id='root-layout'
					className='w-full h-full rounded-lg bg-gradient-linear flex flex-col'
				>
					<Header />
					{children}
				</main>
			</body>
		</html>
	)
}
