import type { Metadata } from 'next'
import './globals.css'
import Header from '@/ui/layout/Header'
import { Suspense } from 'react'
import Loading from '@/ui/loading/loading'

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
					className='w-full h-full overflow-hidden rounded-lg bg-gradient-linear flex flex-col'
				>
					<Header />
					<Suspense fallback={<Loading />}>
						<div className='w-full overflow-hidden'>{children}</div>
					</Suspense>
				</main>
			</body>
		</html>
	)
}
