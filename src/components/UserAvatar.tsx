import { Avatar, type MantineSize } from "@mantine/core";

interface UserAvatarProps {
	username: string;
	size?: MantineSize;
}

const UserAvatar = ({ username, size }: UserAvatarProps) => (
	<Avatar color="cyan" radius="xl" size={size}>
		{username[0].toUpperCase()}
	</Avatar>
);

export default UserAvatar;
