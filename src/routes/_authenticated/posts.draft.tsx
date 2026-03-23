import { Text } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import DraftPostsTable from "@/components/post/DraftPostsTable";
import { useFetchPosts } from "@/hooks/useFetchPosts";

export const Route = createFileRoute("/_authenticated/posts/draft")({
	component: MyDraftPostsComponent,
});

function MyDraftPostsComponent() {
	const { posts, isLoading, error, fetchData } = useFetchPosts("draft");

	if (isLoading) return <Text c="dimmed">Loading...</Text>;
	if (error) {
		console.error(error);
		return <Text c="pink">Error occurred: {error}</Text>;
	}

	return <DraftPostsTable posts={posts} fetchData={fetchData} />;
}
