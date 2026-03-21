import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/posts/published")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_authenticated/posts/published"!</div>;
}
