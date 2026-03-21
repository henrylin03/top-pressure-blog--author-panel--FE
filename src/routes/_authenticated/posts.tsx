import { Button, Container, Group, Stack, Tabs, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconBallpen } from "@tabler/icons-react";
import {
	createFileRoute,
	Navigate,
	Outlet,
	useLocation,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/posts")({
	component: MyPostsPage,
	beforeLoad: ({ location }) => {
		if (location.pathname === "/posts")
			throw Route.redirect({ to: "/posts/draft", replace: true });
	},
});

const VALID_TAB_VALUES = ["draft", "published"];

function MyPostsPage() {
	const navigate = Route.useNavigate();
	const { auth } = Route.useRouteContext();
	const location = useLocation();
	const isNarrowScreen = useMediaQuery("(max-width: 48em)");

	if (!auth.user) return <Navigate to="/login" />;

	let tabValue = location.pathname.split("/").pop();
	if (!tabValue || !VALID_TAB_VALUES.includes(tabValue)) tabValue = "draft";

	return (
		<Container mt="xl">
			<Stack gap="xl">
				<Group justify="space-between" align="center" component="header">
					<Title order={2} size={isNarrowScreen ? "h1" : "2.5rem"}>
						My Posts
					</Title>
					<Button
						leftSection={<IconBallpen size={20} />}
						size={isNarrowScreen ? "md" : "lg"}
						mt="xs"
					>
						Write post
					</Button>
				</Group>
				<Tabs
					component="nav"
					value={tabValue}
					onChange={(value) => navigate({ to: `/posts/${value}` })}
				>
					<Tabs.List grow>
						<Tabs.Tab value="draft">Draft</Tabs.Tab>
						<Tabs.Tab value="published">Published</Tabs.Tab>
					</Tabs.List>
				</Tabs>

				<Outlet />
			</Stack>
		</Container>
	);
}
