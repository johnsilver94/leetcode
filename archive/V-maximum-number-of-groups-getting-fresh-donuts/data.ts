interface IData {
	batchSize: number
	groups: number[]
}

export const data: IData[] = [
	{ batchSize: 3, groups: [1, 2, 3, 4, 5, 6] },
	{ batchSize: 4, groups: [1, 3, 2, 5, 2, 2, 1, 6] },
	{ batchSize: 7, groups: [3, 2, 1, 4, 5, 7] },
	{ batchSize: 7, groups: [1, 2, 2, 1, 2, 2, 1, 1, 3, 3] },
	{ batchSize: 7, groups: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 19] },
	{ batchSize: 7, groups: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 9, 19] },
	{ batchSize: 9, groups: [4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5] },
	{ batchSize: 5, groups: [1, 1, 1, 1, 2, 2, 4, 4, 4] },
	{ batchSize: 5, groups: [1, 1, 1, 1, 1, 1, 2, 2, 4] },
	{ batchSize: 5, groups: [1, 1, 1, 1, 1, 4, 4, 4, 4] },
	{
		batchSize: 2,
		groups: [
			652231582, 818492002, 823729239, 2261354, 747144855, 478230860, 285970257, 774747712, 860954510, 245631565,
			634746161, 109765576, 967900367, 340837477, 32845752, 23968185
		]
	},
	{
		batchSize: 2,
		groups: [
			916210963, 37071830, 515639792, 260640057, 798574708, 856206295, 434101040, 444866270, 713762924, 185765287,
			394196213, 589268180, 947826294, 754884266, 833049335, 724223643, 792652821, 402334308, 92843871
		]
	},
	{
		batchSize: 3,
		groups: [844438225, 657615828, 355556135, 491931377, 644089602, 30037905, 863899906, 246536524, 682224520]
	},
	{
		batchSize: 7,
		groups: [
			287773481, 815094798, 356732984, 644469322, 543193620, 903158817, 274116865, 395252956, 363839119, 365378492,
			122313059, 312690039, 252532812
		]
	}
]
