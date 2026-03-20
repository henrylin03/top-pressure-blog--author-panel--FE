import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/posts")({
	component: MyPostsPage,
});

function MyPostsPage() {
	const { auth } = Route.useRouteContext();
	console.log("auth:", auth);

	return <h1>My posts</h1>;
}
