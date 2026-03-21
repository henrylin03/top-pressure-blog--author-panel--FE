import { Text } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import PublishedPostsTable from "@/components/post/PublishedPostsTable";
import { JWT_LOCALSTORAGE_KEY } from "@/contexts/auth";
import { useFetchPosts } from "@/hooks/useFetchPosts";

export const Route = createFileRoute("/_authenticated/posts/published")({
	component: MyPublishedPostsComponent,
});

function MyPublishedPostsComponent() {
	const { posts, isLoading, error, fetchData } = useFetchPosts(
		"/api/users/me/posts?published=true",
		localStorage.getItem(JWT_LOCALSTORAGE_KEY) || "",
	);

	if (isLoading) return <p>Loading...</p>;
	if (error) {
		console.error(error);
		return <Text>Error occurred: {error}</Text>;
	}

	return <PublishedPostsTable posts={posts} fetchData={fetchData} />;
}
