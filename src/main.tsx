import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "./styles/global.css";
import { theme } from "./styles/theme";

const router = createRouter({ routeTree });
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<MantineProvider theme={theme}>
				<RouterProvider router={router} />
			</MantineProvider>
		</StrictMode>,
	);
}
