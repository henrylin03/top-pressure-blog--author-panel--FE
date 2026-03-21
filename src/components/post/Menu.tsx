import { ActionIcon, Menu as MantineMenu } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import type { PostPreview } from "@/types/post";

interface Props {
	post: PostPreview;
}

const Menu = ({ post }: Props) => {
	return (
		<MantineMenu shadow="xl" width="fit-content" position="bottom-end">
			<MantineMenu.Target>
				<ActionIcon
					variant="subtle"
					aria-label="View more"
					color="gray"
					radius="xl"
				>
					<IconDots size={20} stroke={1.5} />
				</ActionIcon>
			</MantineMenu.Target>

			<MantineMenu.Dropdown>
				{post.isPublished && (
					<>
						<MantineMenu.Item>View live</MantineMenu.Item>
						<MantineMenu.Divider />
					</>
				)}
				<MantineMenu.Item>Edit post</MantineMenu.Item>
				<MantineMenu.Item>
					{post.isPublished ? "Unpublish" : "Publish"} post
				</MantineMenu.Item>

				<MantineMenu.Divider />
				<MantineMenu.Item>Manage comments</MantineMenu.Item>
				<MantineMenu.Divider />
				<MantineMenu.Item c="pink">Delete post</MantineMenu.Item>
			</MantineMenu.Dropdown>
		</MantineMenu>
	);
};

export default Menu;
