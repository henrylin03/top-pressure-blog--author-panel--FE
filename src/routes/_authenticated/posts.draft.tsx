import { Text } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import DraftPostsTable from "@/components/post/DraftPostsTable";
import { JWT_LOCALSTORAGE_KEY } from "@/contexts/auth";
import { useFetchPosts } from "@/hooks/useFetchPosts";

export const Route = createFileRoute("/_authenticated/posts/draft")({
	component: MyDraftPostsComponent,
});

function MyDraftPostsComponent() {
	const { posts, isLoading, error } = useFetchPosts(
		"/api/users/me/posts?published=false",
		localStorage.getItem(JWT_LOCALSTORAGE_KEY) || "",
	);

	if (isLoading) return <p>Loading...</p>;
	if (error) {
		console.error(error);
		return <Text>Error occurred: {error}</Text>;
	}

	console.log("posts:", posts);

	return <DraftPostsTable posts={posts} />;
}
