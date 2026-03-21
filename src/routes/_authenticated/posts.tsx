import { Button, Container, Group, Stack, Tabs, Title } from "@mantine/core";
import { IconBallpen } from "@tabler/icons-react";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import PublishedPostsTable from "@/components/post/PublishedPostsTable";
import { JWT_LOCALSTORAGE_KEY } from "@/contexts/auth";
import { useFetchPosts } from "@/hooks/useFetchPosts";

export const Route = createFileRoute("/_authenticated/posts")({
	component: MyPostsPage,
});

function MyPostsPage() {
	const { posts, isLoading, error } = useFetchPosts(
		"/api/users/me/posts",
		localStorage.getItem(JWT_LOCALSTORAGE_KEY) || "",
	);
	const { auth } = Route.useRouteContext();
	if (!auth.user) return <Navigate to="/login" />;

	if (isLoading) return <p>Loading...</p>;
	if (error) console.error(error);

	return (
		<Container mt="xl">
			<Stack gap="xl">
				<Group justify="space-between" align="center" component="header">
					<Title order={2} size="2.5rem">
						My Posts
					</Title>
					<Button leftSection={<IconBallpen size={20} />} size="lg" mt="xs">
						Write post
					</Button>
				</Group>
				<Tabs component="nav" variant="default" defaultValue="draft">
					<Tabs.List grow>
						<Tabs.Tab value="draft">Draft</Tabs.Tab>
						<Tabs.Tab value="published">Published</Tabs.Tab>
					</Tabs.List>
				</Tabs>
				<section>
					<PublishedPostsTable posts={posts} />
				</section>
			</Stack>
		</Container>
	);
}
