'use client';

import Form from '@/components/Form';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const EditPost = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const promptId = searchParams.get('id');

	const [submitting, setSubmitting] = useState(false);
	const [postForm, setPostForm] = useState({
		prompt: '',
		tag: '',
	});

	useEffect(() => {
		const getPromptDetails = async () => {
			const response = await fetch(`/api/prompt/${promptId}`);

			const data = await response.json();

			setPostForm({
				prompt: data.prompt,
				tag: data.tag,
			});
		};

		if (promptId) {
			getPromptDetails();
		}
	}, [promptId]);

	const updatePostHandler = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		if (!promptId) {
			return alert('Promt ID not found');
		}

		try {
			const response = await fetch(`/api/prompt/${promptId}`, {
				method: 'PATCH',
				body: JSON.stringify({
					prompt: postForm.prompt,
					tag: postForm.tag,
				}),
			});

			if (response.ok) {
				router.push('/');
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};

	return <Form type="Edit" post={postForm} setPost={setPostForm} submitting={submitting} handleSubmit={updatePostHandler} />;
};

export default EditPost;
