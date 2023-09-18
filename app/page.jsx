import Feed from '@/components/Feed';
import { Suspense } from 'react';
import Loading from './loading';

const Home = () => {
	return (
		<section className=" w-full flex_center flex-col">
			<h1 className="head_text text-center">
				Discover & Share
				<br className=" max-md:hidden" />
				<span className="orange_gradient text-center">Your ideas</span>
			</h1>
			<p className="desc text-center">
				Do you want to share your idea? It's very simple! Log in with your Google account and add your ideas to the board so that everyone can see them. Additionally, you will be able to edit and
				delete them after logging in.
				<br />
				<br />
				Use the search bar to enter the phrase you're interested in and see if someone hasn't come up with a similar idea.
			</p>

			<Suspense fallback={<Loading />}>
				<Feed />
			</Suspense>
		</section>
	);
};

export default Home;
