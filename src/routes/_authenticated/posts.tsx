import { Button, Container, Group, Tabs, Title } from "@mantine/core";
import { IconBallpen } from "@tabler/icons-react";
import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/posts")({
	component: MyPostsPage,
});

function MyPostsPage() {
	const { auth } = Route.useRouteContext();
	if (!auth.user) return <Navigate to="/login" />;

	const handleAddNewPost = () => {
		return;
	};

	return (
		<Container mt="xl">
			<Group justify="space-between" align="center" component="header">
				<Title order={2} size="2.5rem">
					My Posts
				</Title>
				<Button
					leftSection={<IconBallpen size={20} />}
					size="lg"
					mt="xs"
					onClick={handleAddNewPost}
				>
					Write post
				</Button>
			</Group>

			<Tabs component="nav" variant="default" mt="xl" defaultValue="draft">
				<Tabs.List grow>
					<Tabs.Tab value="draft">Draft</Tabs.Tab>
					<Tabs.Tab value="published">Published</Tabs.Tab>
				</Tabs.List>
			</Tabs>
		</Container>
	);
}
