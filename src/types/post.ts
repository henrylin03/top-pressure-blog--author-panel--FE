import type { Comment } from "./comment";

export type Post = {
	id: string;
	title: string;
	lede: string;
	text: string;
	lastModifiedAt: Date;
	publishedAt: Date | null;
	timeToReadInMinutes: number;
	comments: Comment[];
};

export type PostPreview = Pick<
	Post,
	"id" | "title" | "lastModifiedAt" | "publishedAt" | "comments"
>;
