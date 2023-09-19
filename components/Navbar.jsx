'use client';

import React, { useEffect, useState } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineMenu } from 'react-icons/ai';
import { Tooltip } from 'react-tooltip';

const Navbar = () => {
	const { data: session } = useSession();

	const [providers, setProviders] = useState(null);
	const [navMobile, setNavMobile] = useState(false);

	useEffect(() => {
		const fetchProviders = async () => {
			const res = await getProviders();

			setProviders(res);
		};

		fetchProviders();
	}, []);

	return (
		<nav className=" flex_between w-full mb-16 pt-3">
			<Link href={`/`} className=" flex gap-2 flex_center">
				<Image src={`/assets/images/logo.svg`} alt="Logo" width={30} height={30} className=" object-contain" />
				<p className="logo_text">Share Ideas</p>
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
							<Image
								data-tooltip-id="my-tooltip"
								data-tooltip-content="Your profile"
								src={session?.user.image}
								width={37}
								height={37}
								alt="Logo user"
								className="hover:scale-110 rounded-full transition"
							/>
							<Tooltip id="my-tooltip" />
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
						<AiOutlineMenu className=" scale-150 cursor-pointer" onClick={() => setNavMobile((prev) => !prev)} />

						{navMobile && (
							<div className="dropdown">
								<Image src={session?.user.image} alt="Logo" width={27} height={27} className=" rounded-full" />
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
