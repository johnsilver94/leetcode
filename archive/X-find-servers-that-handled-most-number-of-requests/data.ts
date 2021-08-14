interface IData {
	k: number
	arrival: number[]
	load: number[]
}

export const data: [IData, number[]][] = [
	// Base test data
	[{ k: 3, arrival: [1, 2, 3, 4, 5], load: [5, 2, 3, 3, 3] }, [1]],
	[{ k: 3, arrival: [1, 2, 3, 4], load: [1, 2, 1, 2] }, [0]],
	[{ k: 3, arrival: [1, 2, 3], load: [10, 12, 11] }, [0, 1, 2]],
	[{ k: 3, arrival: [1, 2, 3, 4, 8, 9, 10], load: [5, 2, 10, 3, 1, 2, 2] }, [1]],
	[{ k: 1, arrival: [1], load: [1] }, [0]],
	// Tested Data in leetcode
	[
		{
			k: 2,
			arrival: [1, 2, 3],
			load: [1_000_000_000, 1, 1_000_000_000]
		},
		[1]
	],
	[
		{
			k: 2,
			arrival: [2, 3, 4, 8],
			load: [3, 2, 4, 3]
		},
		[1]
	],
	[
		{
			k: 3,
			arrival: [2, 6, 7, 8],
			load: [1, 3, 1, 4]
		},
		[0]
	],
	[
		{
			k: 3,
			arrival: [1],
			load: [1_000_000_000]
		},
		[0]
	],
	[{ k: 2, arrival: [1, 4, 5, 7], load: [3, 2, 7, 8] }, [0, 1]],
	[
		{
			k: 3,
			arrival: [1, 2, 6, 9, 10, 12],
			load: [2, 4, 3, 3, 11, 8]
		},
		[0, 1, 2]
	],
	[{ k: 2, arrival: [1, 3, 5, 6, 7, 12], load: [3, 4, 6, 5, 5, 6] }, [1]],
	[{ k: 4, arrival: [1, 3, 4, 5, 10, 12], load: [11, 9, 3, 1, 9, 12] }, [1, 2]]
]
