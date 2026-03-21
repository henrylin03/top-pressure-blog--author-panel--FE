import {
	Button,
	Container,
	Group,
	Stack,
	Textarea,
	TextInput,
	Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/new-post")({
	component: NewPostPage,
});

function NewPostPage() {
	const isNarrowScreen = useMediaQuery("(max-width: 48em)");

	return (
		<Container mt="4rem" maw="40rem">
			<Group justify="space-betwen" component="header">
				<Title order={2} size={isNarrowScreen ? "h1" : "2.5rem"}>
					New post
				</Title>
			</Group>

			<Stack component="form" mt="xl" gap="lg">
				<TextInput
					aria-label="Title"
					size="md"
					required
					name="title"
					placeholder="Title*"
				/>
				<Textarea
					aria-label="Lede"
					size="md"
					name="lede"
					placeholder="Lede (optional)"
				/>
				<Textarea
					aria-label="Body text"
					name="text"
					size="md"
					placeholder="Body text*"
					minRows={8}
					autosize
					required
				/>
				<Group justify="end" mt="lg" gap="xs">
					<Button
						size="md"
						variant="outline"
						color="gray"
						component={Link}
						to="/posts/draft"
					>
						Cancel
					</Button>
					<Button size="md" type="submit">
						Publish
					</Button>
				</Group>
			</Stack>
		</Container>
	);
}
