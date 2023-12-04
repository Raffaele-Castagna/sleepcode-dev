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
		difficulty: "Difficle",
		category: "Linked List",
		order: 2,
		videoId: "",
	},
	{
		id: "jump-game",
		title: "Jump Game",
		difficulty: "Medio",
		category: "Dynamic Programming",
		order: 3,
		videoId: "",
	},
	{
		id: "valid-parentheses",
		title: "Valid Parentheses",
		difficulty: "Facile",
		category: "Stack",
		order: 4,
		videoId: "xty7fr-k0TU",
	},
	{
		id: "search-a-2d-matrix",
		title: "Search a 2D Matrix",
		difficulty: "Difficile",
		category: "Binary Search",
		order: 5,
		videoId: "ZfFl4torNg4",
	},
	{
		id: "container-with-most-water",
		title: "Container With Most Water",
		difficulty: "Medio",
		category: "Two Pointers",
		order: 6,
		videoId: "",
	},
	{
		id: "merge-intervals",
		title: "Merge Intervals",
		difficulty: "Medio",
		category: "intervals",
		order: 7,
		videoId: "",
	},
	{
		id: "maximum-depth-of-binary-tree",
		title: "Maximum Depth of Binary Tree",
		difficulty: "Facile",
		category: "Tree",
		order: 8,
		videoId: "4qYTqOiRMoM",
	},
	{
		id: "best-time-to-buy-and-sell-stock",
		title: "Best Time to Buy and Sell Stock",
		difficulty: "Difficile",
		category: "Array",
		order: 9,
		videoId: "",
	},
	{
		id: "subsets",
		title: "Subsets",
		difficulty: "Medio",
		category: "Backtracking",
		order: 10,
		videoId: "",
	},
];