import UserAvatar from "@components/UserAvatar";
import { Group, Menu, Text } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "@tanstack/react-router";
import ProfileButton from "./ProfileButton";

type Props = Readonly<{ username: string; email: string; logout: () => void }>;

const ProfileMenu = ({ username, email, logout }: Props) => {
	const router = useRouter();

	const handleSignOut = async () => {
		logout();
		await router.invalidate();
	};

	return (
		<Menu width={180} shadow="md">
			<Menu.Target>
				<ProfileButton username={username} email={email} />
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Label>
					<Group>
						<UserAvatar username={username} size="md" />
						<Text c="dark.7">{username}</Text>
					</Group>
				</Menu.Label>
				<Menu.Divider />
				<Menu.Item
					onClick={handleSignOut}
					leftSection={<IconLogout size={20} strokeWidth={1} />}
					c="dark.7"
				>
					Sign out
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
};

export default ProfileMenu;
