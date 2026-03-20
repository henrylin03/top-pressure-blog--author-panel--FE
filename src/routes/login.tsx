import {
	Button,
	Card,
	Container,
	Image,
	PasswordInput,
	Stack,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import logoImg from "/images/logo.png";

export const Route = createFileRoute("/login")({
	validateSearch: (search) => ({
		redirect: (search.redirect as string) || "/posts",
	}),
	beforeLoad: ({ context, search }) => {
		if (context.auth.user) throw redirect({ to: search.redirect });
	},
	component: LoginPage,
});

function LoginPage() {
	const { auth } = Route.useRouteContext();
	const { redirect } = Route.useSearch();
	const navigate = Route.useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const isNarrowScreen = useMediaQuery("(max-width: 48em)");
	const router = useRouter();

	const { login } = auth;

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		const formData = new FormData(e.currentTarget);
		const usernameOrEmail = formData.get("usernameOrEmail");
		const password = formData.get("password");

		try {
			if (!usernameOrEmail || !password)
				throw new Error("Username and/or password missing");

			await login(usernameOrEmail.toString(), password.toString());
			await router.invalidate();
			navigate({ to: redirect });
		} catch (err) {
			if (err instanceof Error) {
				console.error(err.message);
				setError(err.message);
			} else {
				console.error(err);
				setError(String(err));
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Container mt="6rem">
			<Card
				shadow="sm"
				maw="22rem"
				mx="auto"
				py={{ base: "xl", xs: "4rem" }}
				px={{ base: "lg", xs: "xl" }}
				radius="lg"
			>
				<Stack align="center" gap="xl">
					<Stack component="header" align="center" gap="xs">
						<Image
							w={60}
							h="auto"
							fit="contain"
							src={logoImg}
							loading="eager"
							alt="Logo of Top Pressure Blog"
						/>
						<Title order={2} fz="h1" c="dark.6" ta="center">
							Welcome back!
						</Title>
					</Stack>

					<form onSubmit={handleSubmit} style={{ width: "100%" }}>
						<Stack component="ul">
							<li>
								<TextInput
									placeholder="Email or username"
									required
									name="usernameOrEmail"
									size={isNarrowScreen ? "sm" : "md"}
								/>
							</li>
							<li>
								<PasswordInput
									placeholder="Password"
									required
									name="password"
									size={isNarrowScreen ? "sm" : "md"}
								/>
							</li>
							{error && (
								<li>
									<Text fz="sm" style={{ color: "var(--mantine-color-error)" }}>
										{error}
									</Text>
								</li>
							)}
							<li>
								<Button
									size={isNarrowScreen ? "md" : "lg"}
									fullWidth
									type="submit"
									loading={isLoading}
								>
									Sign in
								</Button>
							</li>
						</Stack>
					</form>
				</Stack>
			</Card>
		</Container>
	);
}
