import { Text } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import PublishedPostsTable from "@/components/post/PublishedPostsTable";
import { useFetchPosts } from "@/hooks/useFetchPosts";

export const Route = createFileRoute("/_authenticated/posts/published")({
	component: MyPublishedPostsComponent,
});

function MyPublishedPostsComponent() {
	const { posts, isLoading, error, fetchData } = useFetchPosts("published");

	if (isLoading) return <Text c="dimmed">Loading...</Text>;
	if (error) {
		console.error(error);
		return <Text c="pink">Error occurred: {error}</Text>;
	}

	return <PublishedPostsTable posts={posts} fetchData={fetchData} />;
}
