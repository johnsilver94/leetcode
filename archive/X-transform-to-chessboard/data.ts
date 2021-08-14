interface IData {
	board: number[][]
	result: number
}

export const data: IData[] = [
	// Base test data
	{
		board: [
			[0, 1, 1, 0],
			[0, 1, 1, 0],
			[1, 0, 0, 1],
			[1, 0, 0, 1]
		],
		result: 2
	},
	{
		board: [
			[0, 1],
			[1, 0]
		],
		result: 0
	},
	{
		board: [
			[0, 1],
			[1, 0]
		],
		result: -1
	}
]
