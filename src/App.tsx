import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "@tanstack/react-router";
import { AuthProvider, useAuth } from "./contexts/auth";
import { router } from "./router";
import { theme } from "./styles/theme";
import "./styles/global.css";
import "@mantine/core/styles.css";

const InnerApp = () => {
	const auth = useAuth();
	return <RouterProvider router={router} context={{ auth }} />;
};

const App = () => (
	<MantineProvider theme={theme}>
		<AuthProvider>
			<InnerApp />
		</AuthProvider>
	</MantineProvider>
);

export default App;
