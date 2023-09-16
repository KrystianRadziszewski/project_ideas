import { connectToDB } from '@/utils/database';
import Prompt from '@/models/prompt';

// get the post from DB
export const GET = async (request, { params }) => {
	try {
		await connectToDB();

		const prompts = await Prompt.find({ creator: params.id }).populate('creator');

		return new Response(JSON.stringify(prompts), { status: 200 });
	} catch (error) {
		return new Response('Failed to fetch posts', { status: 500 });
	}
};