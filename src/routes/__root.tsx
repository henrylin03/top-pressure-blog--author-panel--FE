import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { AuthState } from "@/contexts/auth";

const RootLayout = () => (
	<>
		<HeadContent />

		<main>
			<Outlet />
		</main>

		<TanStackRouterDevtools />
	</>
);

interface MyRouterContext {
	auth: AuthState;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
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
