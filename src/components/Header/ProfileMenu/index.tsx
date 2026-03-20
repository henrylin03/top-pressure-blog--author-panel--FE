import UserAvatar from "@components/UserAvatar";
import { Group, Menu, Text } from "@mantine/core";
import { IconAlignLeft2, IconLogout } from "@tabler/icons-react";
import { Link, useRouter } from "@tanstack/react-router";
import type { AuthState } from "@/contexts/auth";
import type { User } from "@/types/user";
import ProfileButton from "./ProfileButton";

type Props = { user: User; logout: AuthState["logout"] };

const ProfileMenu = ({ user, logout }: Props) => {
	const router = useRouter();

	const { username, email, isAuthor } = user;

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
				{isAuthor && (
					<Menu.Item
						c="dark.7"
						leftSection={<IconAlignLeft2 size={20} strokeWidth={1} />}
						component={Link}
						to="/posts"
					>
						View posts
					</Menu.Item>
				)}
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
