export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className='w-full h-full p-6 flex flex-col' id='dashboard-layout'>
			{children}
		</div>
	)
}
