import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

const PostCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
	const [copied, setCopied] = useState('');
	const pathName = usePathname();
	const { data: session } = useSession();
	const router = useRouter();

	const handleCopied = () => {
		setCopied(post.prompt);
		navigator.clipboard.writeText(post.prompt);
		setTimeout(() => setCopied(''), 3000);
	};

	const upChar = (text) => {
		return text.charAt(0).toUpperCase() + text.slice(1);
	};

	return (
		<div className="prompt_card">
			<div className=" flex justify-between items-start gap-5">
				<div className="flex-1 flex justify-start items-center gap-3 ">
					<Image src={post.creator.image} alt="user_image" width={40} height={40} className=" rounded-full object-contain" />

					<div className="flex flex-col">
						<h3 className="font-satoshi font-semibold text-gray-900">
							<span className=" font-thin text-sm text-gray-400">Created by: </span>
							{upChar(post.creator.username)}
						</h3>
					</div>
				</div>

				<div className="copy_btn" onClick={handleCopied}>
					<Image src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'} height={15} width={15} alt="copy-icon" />
				</div>
			</div>

			<p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
			<p className="font-inter text-sm blue_gradient " onClick={() => handleTagClick && handleTagClick(post.tag)}>
				#{post.tag}
			</p>

			{session?.user.id === post.creator._id && pathName === '/profile' && (
				<>
					<div className="mt-5 flex flex_end gap-6 border-t border-gray-100 pt-3 font-semibold">
						<p className="form_btn text-green-700" onClick={handleEdit}>
							Edit
						</p>
						<p className="form_btn text-orange-600 " onClick={handleDelete}>
							Delete
						</p>
					</div>
				</>
			)}
		</div>
	);
};

export default PostCard;
