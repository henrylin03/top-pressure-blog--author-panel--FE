import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	validateSearch: (search) => ({
		redirect: (search.redirect as string) || "/posts",
	}),
	beforeLoad: ({ context, search }) => {
		if (!context.auth.user) throw redirect({ to: "/login", search });
		else throw redirect({ to: search.redirect });
	},
	component: () => <Outlet />,
});
