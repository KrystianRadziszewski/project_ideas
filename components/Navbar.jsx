'use client';

import React, { useEffect, useState } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
	const { data: session } = useSession();

	const [providers, setProviders] = useState(null);
	const [navMobile, setNavMobile] = useState(false);

	useEffect(() => {
		const fetchProviders = async () => {
			const res = await getProviders();

			console.log(res);

			setProviders(res);
		};

		fetchProviders();
	}, []);

	return (
		<nav className=" flex_between w-full mb-16 pt-3">
			<Link href={`/`} className=" flex gap-2 flex_center">
				<Image src={`/assets/images/logo.svg`} alt="Logo" width={30} height={30} className=" object-contain" />
				<p className="logo_text">SharePlans</p>
			</Link>

			{/* Desktop Nav */}
			<div className="hidden sm:flex">
				{session?.user ? (
					<div className="flex gap-3 md:gap-5">
						<Link href={`/create-post`} className="black_btn">
							Create Post
						</Link>
						<button type="button" onClick={() => signOut()} className="outline_btn">
							Sing Out
						</button>
						<Link href={`/profile`}>
							<Image src={session?.user.image} width={37} height={37} alt="Logo user" className=" rounded-full" />
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button key={provider.id} type="button" onClick={() => signIn(provider.id)} className="black_btn">
									Sign In
								</button>
							))}
					</>
				)}
			</div>

			{/* Mobile Nav */}
			<div className="flex relative sm:hidden">
				{session?.user ? (
					<div className="flex">
						<Image src={session?.user.image} alt="Logo" width={37} height={37} className=" rounded-full" onClick={() => setNavMobile((prev) => !prev)} />

						{navMobile && (
							<div className="dropdown">
								<Link href={`/profile`} className="dropdown_link" onClick={() => setNavMobile(false)}>
									My Profile
								</Link>
								<Link href={`/create-post`} className="dropdown_link" onClick={() => setNavMobile(false)}>
									Create Post
								</Link>
								<button
									type="button"
									onClick={() => {
										setNavMobile(false);
										signOut();
									}}
									className="mt-5 w-full black_btn"
								>
									Sing Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button key={provider.id} type="button" onClick={() => signIn(provider.id)} className="black_btn">
									Sign In
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
