import { useEffect, useState } from "react";

export const useFetchPosts = (url: string, jwt: string) => {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				if (!jwt) throw new Error("JWT missing. User is not authenticated.");

				const res = await fetch(url, {
					headers: { Authorization: `Bearer ${jwt}` },
				});
				const json = await res.json();
				console.log("json:", json);
				setPosts(json.posts);
			} catch (error) {
				error instanceof Error
					? setError(error.message)
					: setError(String(error));
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [url, jwt]);

	return { posts, isLoading, error };
};
