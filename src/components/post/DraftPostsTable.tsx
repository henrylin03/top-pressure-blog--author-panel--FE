import { Group, Table } from "@mantine/core";
import { IconMessage } from "@tabler/icons-react";
import dayjs from "dayjs";
import type { PostPreview } from "@/types/post";

interface Props {
	posts: PostPreview[];
}

const DraftPostsTable = ({ posts }: Props) => {
	const rows = posts.map((p) => {
		const DATE_FORMAT = "D MMM YYYY";
		const lastModifiedDate = dayjs(p.lastModifiedAt).format(DATE_FORMAT);

		return (
			<Table.Tr key={p.id} fz="md">
				<Table.Td>{p.title}</Table.Td>
				<Table.Td>{lastModifiedDate}</Table.Td>
				<Table.Td>
					<Group gap="xs" align="center">
						<IconMessage size={18} opacity={0.6} />
						<span>{p.comments.length}</span>
					</Group>
				</Table.Td>
			</Table.Tr>
		);
	});

	return (
		<Table withRowBorders={false}>
			<Table.Thead>
				<Table.Tr c="gray.6">
					<Table.Th fw="normal">Title</Table.Th>
					<Table.Th fw="normal">Last modified</Table.Th>
					<Table.Th fw="normal">Comments</Table.Th>
				</Table.Tr>
			</Table.Thead>

			<Table.Tbody>{rows}</Table.Tbody>
		</Table>
	);
};

export default DraftPostsTable;
