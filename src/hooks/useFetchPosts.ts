import { useCallback, useEffect, useState } from "react";

export const useFetchPosts = (url: string, jwt: string) => {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const fetchData = useCallback(async () => {
		setIsLoading(true);
		try {
			if (!jwt) throw new Error("JWT missing. User is not authenticated.");
			const res = await fetch(url, {
				headers: { Authorization: `Bearer ${jwt}` },
			});
			const json = await res.json();
			setPosts(json.posts);
		} catch (error) {
			error instanceof Error
				? setError(error.message)
				: setError(String(error));
		} finally {
			setIsLoading(false);
		}
	}, [url, jwt]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { posts, isLoading, error, fetchData };
};
