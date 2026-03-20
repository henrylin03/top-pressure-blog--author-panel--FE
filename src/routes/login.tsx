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
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import logoImg from "/images/logo.png";

export const Route = createFileRoute("/login")({
	component: LoginPage,
});

function LoginPage() {
	const [isLoading, _setIsLoading] = useState(false);
	const [error, _setError] = useState("");

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		alert("submitted");
	};

	return (
		<Container mt="6rem">
			<Card
				shadow="sm"
				maw="24rem"
				mx="auto"
				py={{ base: "xl", xs: "4rem" }}
				px={{ base: "lg", xs: "2.5rem" }}
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
						<Title order={2} fz="h1" c="dark.6">
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
									size="md"
								/>
							</li>
							<li>
								<PasswordInput
									placeholder="Password"
									required
									name="password"
									size="md"
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
								<Button size="lg" fullWidth type="submit" loading={isLoading}>
									{isLoading ? "Signing in" : "Sign in"}
								</Button>
							</li>
						</Stack>
					</form>
				</Stack>
			</Card>
		</Container>
	);
}
