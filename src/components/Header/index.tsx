import { Group, Paper, Title } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/contexts/auth";
import logo from "/images/logo.png";
import ProfileMenu from "./ProfileMenu";

const Header = () => {
	const { user, logout } = useAuth();

	return (
		<Paper component="header" px="xl" py="lg" shadow="xs" radius={0}>
			<Group justify="space-between">
				<Group
					gap="md"
					h="100%"
					renderRoot={(props) => (
						<Link to="/" aria-label="Go home" {...props} />
					)}
				>
					<img src={logo} loading="eager" alt="logo" width="32" height="32" />
					<Title order={1} fz="h3" mb={4} visibleFrom="sm">
						Top Pressure
					</Title>
				</Group>

				{user && <ProfileMenu user={user} logout={logout} />}
			</Group>
		</Paper>
	);
};

export default Header;
