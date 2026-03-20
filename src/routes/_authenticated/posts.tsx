import { Button, Container, Group, Title } from "@mantine/core";
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
		</Container>
	);
}
