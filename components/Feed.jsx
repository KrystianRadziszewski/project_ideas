'use client';

import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';

const PostCardList = ({ data, handleTagClick }) => {
	// const [data, setData] = useState([]);
	// const [isLoading, setIsLoading] = useState(true);

	// useEffect(() => {}, []);

	return (
		<div className="mt-16 prompt_layout">
			{data.map((post) => (
				<PostCard key={post._id} post={post} handleTagClick={handleTagClick} />
			))}
		</div>
	);
};

const Feed = () => {
	const [posts, setPosts] = useState([]);

	// search states
	const [searchText, setSearchText] = useState('');
	const [searchTimeout, setSearchTimeout] = useState(null);
	const [searchResults, setSearchResults] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch('/api/prompt');
			const data = await response.json();

			setPosts(data);
			setIsLoading(false);
		};

		fetchPosts();
	}, []);

	const filterPosts = (searchText) => {
		const regex = new RegExp(searchText, 'i');
		return posts.filter((item) => regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.prompt));
	};

	const handleSearchChange = (e) => {
		clearTimeout(searchTimeout);
		setSearchText(e.target.value);

		setSearchTimeout(
			setTimeout(() => {
				const searchResult = filterPosts(e.target.value);
				setSearchResults(searchResult);
			}, 1000)
		);
	};

	const handleTagClick = (tagName) => {
		setSearchText(tagName);

		const searchResult = filterPosts(tagName);
		setSearchResults(searchResult);
	};

	return (
		<section className="feed">
			<form className="relative w-full flex_center">
				<input type="text" value={searchText} placeholder="Search posts for tag or a content..." required onChange={handleSearchChange} className="search_input peer" />
			</form>

			{isLoading ? <p className="mt-16 prompt_layout">Loading posts...</p> : <PostCardList data={searchText ? searchResults : posts} handleTagClick={handleTagClick} />}

			{/* {searchText ? <PostCardList data={searchResults} handleTagClick={handleTagClick} /> : <PostCardList data={posts} handleTagClick={handleTagClick} />} */}
		</section>
	);
};

export default Feed;
