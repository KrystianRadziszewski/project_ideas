import Feed from '@/components/Feed';

const Home = () => {
	return (
		<section className=" w-full flex_center flex-col">
			<h1 className="head_text text-center">
				Discover & Share
				<br className=" max-md:hidden" />
				<span className="orange_gradient text-center">Your plans</span>
			</h1>
			<p className="desc text-center">
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas vel illum culpa nihil est dolorum ducimus dignissimos voluptatibus? Corrupti veritatis quisquam, quia blanditiis laudantium
				itaque?
			</p>

			<Feed />
		</section>
	);
};

export default Home;
