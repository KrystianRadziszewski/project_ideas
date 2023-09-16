import Navbar from '@/components/Navbar';
import './globals.css';
// import type { Metadata } from 'next';
import Provider from '@/components/Provider';

export const metadata = {
	title: 'Promtopia',
	description: ' Discover & Share AI Promts',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<Provider>
					<div className="main">
						<div className="gradient" />
					</div>
					<main className="app">
						<Navbar />
						{children}
					</main>
				</Provider>
			</body>
		</html>
	);
}
