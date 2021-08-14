interface IData {
	deck: number[]
	result: number[]
}

export const data: IData[] = [
	{
		deck: [17, 13, 11, 2, 3, 5, 7],
		result: [2, 13, 3, 11, 5, 17, 7]
	},
	{
		deck: [1, 1000],
		result: [1, 1000]
	},
	{
		deck: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
		result: [1, 7, 2, 10, 3, 8, 4, 12, 5, 9, 6, 11]
	},
	{
		deck: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
		result: [1, 12, 2, 8, 3, 11, 4, 9, 5, 13, 6, 10, 7]
	}
]
