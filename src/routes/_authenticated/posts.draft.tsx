import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/posts/draft")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_authenticated/posts/draft"!</div>;
}
