import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: HomePageRedirection,
});

function HomePageRedirection() {
	const { auth } = Route.useRouteContext();
	const { user } = auth;

	if (!user) return <Navigate to="/login" />;
	else return <Navigate to="/posts" />;
}
