import Prompt from '@/models/prompt';
import { connectToDB } from '@/utils/database';

// body: JSON.stringify({
//   prompt: postForm.prompt,
//   userId: session?.user.id,
//   tag: postForm.tag,
// }),

export const POST = async (req, res) => {
	const { prompt, userId, tag } = await req.json();

	try {
		// <-- lambda question
		await connectToDB();

		const newPrompt = new Prompt({ creator: userId, prompt, tag });

		await newPrompt.save();

		return new Response(JSON.stringify(newPrompt), { status: 201 });
	} catch (error) {
		return new Response('Failed to create a new prompt (api/prompt...)', { status: 501 });
	}
};
