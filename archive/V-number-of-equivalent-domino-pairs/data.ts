interface IData {
	dominoes: [number, number][]
}

export const data: [IData, number][] = [
	// Base test data
	[
		{
			dominoes: [
				[1, 2],
				[2, 1],
				[3, 4],
				[5, 6]
			]
		},
		1
	],
	[
		{
			dominoes: [
				[1, 2],
				[1, 2],
				[1, 1],
				[1, 2],
				[2, 2]
			]
		},
		3
	]
]
