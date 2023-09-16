'use client';

import Form from '@/components/Form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const CreatePost = () => {
	const router = useRouter();
	const { data: session } = useSession();

	const [submitting, setSubmitting] = useState(false);
	const [postForm, setPostForm] = useState({
		prompt: '',
		tag: '',
	});

	const createPostHandler = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			const response = await fetch('/api/prompt/new', {
				method: 'POST',
				body: JSON.stringify({
					prompt: postForm.prompt,
					userId: session?.user.id,
					tag: postForm.tag,
				}),
			});

			if (response.ok) {
				router.push('/');
			}
		} catch (error) {
			console.error();
		} finally {
			setSubmitting(false);
		}
	};

	return <Form type="Create" post={postForm} setPost={setPostForm} submitting={submitting} handleSubmit={createPostHandler} />;
};

export default CreatePost;
