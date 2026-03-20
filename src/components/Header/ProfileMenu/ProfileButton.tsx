import UserAvatar from "@components/UserAvatar";
import { UnstyledButton } from "@mantine/core";
import { forwardRef } from "react";

interface ProfileButtonProps extends React.ComponentPropsWithoutRef<"button"> {
	username: string;
	email: string;
}

const ProfileButton = forwardRef<HTMLButtonElement, ProfileButtonProps>(
	({ username, email, ...others }: ProfileButtonProps, ref) => (
		<UnstyledButton ref={ref} {...others}>
			<UserAvatar username={username} />
		</UnstyledButton>
	),
);

export default ProfileButton;
