import { ActionIcon, Menu as MantineMenu } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import { useRouter } from "@tanstack/react-router";
import { JWT_LOCALSTORAGE_KEY } from "@/contexts/auth";
import type { PostPreview } from "@/types/post";

interface Props {
	post: PostPreview;
}

const Menu = ({ post }: Props) => {
	const jwt = localStorage.getItem(JWT_LOCALSTORAGE_KEY);
	const router = useRouter();

	const unpublishPost = async (postId: PostPreview["id"]) => {
		const response = await fetch(`/api/posts/${postId}/draft`, {
			method: "PATCH",
			headers: { Authorization: `Bearer ${jwt}` },
		});
		if (response.ok) return router.invalidate();
		else console.error(response.status); // TODO: need better error handling tbh
	};

	const publishPost = async (postId: PostPreview["id"]) => {
		const response = await fetch(`/api/posts/${postId}/publish`, {
			method: "PATCH",
			headers: { Authorization: `Bearer ${jwt}` },
		});
		if (response.ok) return router.invalidate();

		const json = await response.json();
		console.error("Error when trying to publish post:", json.error); // TODO: need better error handling tbh
	};

	return (
		<MantineMenu shadow="xl" width={144} position="bottom-end">
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
				{/* {post.isPublished && (
          <>
            <MantineMenu.Item>View live</MantineMenu.Item>
            <MantineMenu.Divider />
          </>
        )} */}
				{/* <MantineMenu.Item>Edit post</MantineMenu.Item> */}

				{post.isPublished ? (
					<MantineMenu.Item onClick={() => unpublishPost(post.id)}>
						Unpublish post
					</MantineMenu.Item>
				) : (
					<MantineMenu.Item onClick={() => publishPost(post.id)}>
						Publish post
					</MantineMenu.Item>
				)}

				<MantineMenu.Divider />
				{/* <MantineMenu.Item>Manage comments</MantineMenu.Item> */}
				{/* <MantineMenu.Divider /> */}
				<MantineMenu.Item c="pink">Delete post</MantineMenu.Item>
			</MantineMenu.Dropdown>
		</MantineMenu>
	);
};

export default Menu;
