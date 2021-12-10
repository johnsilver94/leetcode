interface IData {
	maze: string[][]
	entrance: number[]
	result: number
}

export const data: IData[] = [
	{
		maze: [
			['+', '+', '.', '+'],
			['.', '.', '.', '+'],
			['+', '+', '+', '.']
		],
		entrance: [1, 2],
		result: 2
	},
	{
		maze: [
			['+', '+', '+'],
			['.', '.', '.'],
			['+', '+', '+']
		],
		entrance: [1, 0],
		result: -1
	},
	{
		maze: [['.', '+']],
		entrance: [0, 0],
		result: -1
	}
]
