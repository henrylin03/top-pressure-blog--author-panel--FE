import { Table } from "@mantine/core";
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
			<Table.Tr key={p.id}>
				<Table.Td>{p.title}</Table.Td>
				<Table.Td>{lastModifiedDate}</Table.Td>
				<Table.Td>{p.comments.length}</Table.Td>
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
