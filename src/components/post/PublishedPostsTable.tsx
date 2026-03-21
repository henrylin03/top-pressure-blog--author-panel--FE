import { Table } from "@mantine/core";
import type { PostPreview } from "@/types/post";

interface Props {
	posts: PostPreview[];
}

const PublishedPostsTable = ({ posts }: Props) => {
	const rows = posts.map((p) => {
		if (!p.publishedAt) return null;
		return (
			<Table.Tr key={p.id}>
				<Table.Td>{p.title}</Table.Td>
				<Table.Td>{String(p.publishedAt)}</Table.Td>
				<Table.Td>{String(p.lastModifiedAt)}</Table.Td>
				<Table.Td>{p.comments.length}</Table.Td>
			</Table.Tr>
		);
	});

	return (
		<Table withRowBorders={false}>
			<Table.Thead>
				<Table.Tr>
					<Table.Th>Title</Table.Th>
					<Table.Th>Published</Table.Th>
					<Table.Th>Last modified</Table.Th>
					<Table.Th>Comments</Table.Th>
				</Table.Tr>
			</Table.Thead>

			<Table.Tbody>{rows}</Table.Tbody>
		</Table>
	);
};

export default PublishedPostsTable;
