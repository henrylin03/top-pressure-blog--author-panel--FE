import { useCallback, useEffect, useState } from "react";
import { JWT_LOCALSTORAGE_KEY } from "@/contexts/auth";
import type { Post, PostPublishedStatus } from "@/types/post";

const URL = `${import.meta.env.VITE_API_URL}/api/v1/users/me/posts`;

export const useFetchPosts = (postsStatus: PostPublishedStatus) => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const url = `${URL}?published=${postsStatus === "published"}`;

	const fetchData = useCallback(async () => {
		setIsLoading(true);
		try {
			const jwt = localStorage.getItem(JWT_LOCALSTORAGE_KEY);
			if (!jwt) throw new Error("User must be logged in to do this");
			const res = await fetch(url, {
				headers: { Authorization: `Bearer ${jwt}` },
			});

			const { posts } = await res.json();
			setPosts(posts);
		} catch (error) {
			error instanceof Error
				? setError(error.message)
				: setError(String(error));
		} finally {
			setIsLoading(false);
		}
	}, [url]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { posts, isLoading, error, fetchData };
};
