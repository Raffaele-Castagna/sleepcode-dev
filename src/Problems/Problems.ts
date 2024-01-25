export type Problem = {
	id: string;
	title: string;
	difficulty: string;
	category: string;
	order: number;
	videoId?: string;
};

export const problems: Problem[] = [
	{
		id: "two-sum",
		title: "Two Sum",
		difficulty: "Facile",
		category: "Array",
		order: 1,
		videoId: "NLhkpg9p7VQ",
	},
	{
		id: "reverse-linked-list",
		title: "Reverse Linked List",
		difficulty: "Difficile",
		category: "Linked List",
		order: 2,
		videoId: "1s_PwSyye8s",
	},
	{
		id: "jump-game",
		title: "Jump Game",
		difficulty: "Medio",
		category: "Dynamic Programming",
		order: 3,
		videoId: "QnTCtWTmVgU",
	},
	{
		id: "valid-parentheses",
		title: "Valid Parentheses",
		difficulty: "Facile",
		category: "Stack",
		order: 4,
		videoId: "HhBo1fckgBM",
	},
	{
		id: "search-a-2d-matrix",
		title: "Search a 2D Matrix",
		difficulty: "Difficile",
		category: "Binary Search",
		order: 5,
		videoId: "4UUIbkwkzGQ",
	}
];