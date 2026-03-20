import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Header from "@/components/Header";

const RootLayout = () => (
	<>
		<HeadContent />

		<Header />
		<main>
			<Outlet />
		</main>

		<TanStackRouterDevtools />
	</>
);

export const Route = createRootRoute({
	component: RootLayout,
	head: () => ({
		meta: [
			{
				title:
					"BJJ, Wrestling, Judo | Top Pressure Blog for Submission Grapplers",
			},
		],
	}),
});
