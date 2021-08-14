interface IData {
	n: number
	flights: number[][]
	src: number
	dst: number
	k: number
}
const data: IData = {
	n: 5,
	flights: [
		[1, 2, 10],
		[2, 0, 7],
		[1, 3, 8],
		[4, 0, 10],
		[3, 4, 2],
		[4, 2, 10],
		[0, 3, 3],
		[3, 1, 6],
		[2, 4, 5]
	],
	src: 0,
	dst: 4,
	k: 1
}

console.log(data)

const minWeightNode = (weights: Map<number, number>, visited: Set<number>): number => {
	let minWeight = 0
	let minWeightNode = -1
	console.log(weights, visited)
	weights.forEach((weight, index) => {
		if (!visited.has(index) && (minWeight === 0 || weight < minWeight)) {
			minWeight = weight
			minWeightNode = index
		}
	})
	console.log(minWeight, minWeightNode)
	return minWeightNode
}

const minGraphWeightBetweenTwoNodes = (nodes: number, graph: number[][], start: number, end: number): number => {
	const sortedGraph: { [key: number]: number[][] } = {}
	const weights: Map<number, number> = new Map<number, number>().set(start, 0)
	const visited: Set<number> = new Set<number>().add(start)
	let currentNode: number = start
	// create sorted graph
	let canEnd = false
	let canStart = false

	for (let i = 0; i < nodes; i++) {
		sortedGraph[i] = []
	}
	graph.forEach((el) => {
		sortedGraph[el[0]].push(el)

		if (el[0] === start) canStart = true
		if (el[1] === end) canEnd = true
	})
	console.log(canStart, canEnd)
	if (!canStart && !canEnd) return -1

	console.log('-----Sorted Graph-----')
	console.log(sortedGraph)

	while (currentNode !== -1) {
		console.log(sortedGraph[currentNode])

		for (let i = 0; i < sortedGraph[currentNode].length; i++) {
			const child = sortedGraph[currentNode][i]
			console.log(child)
			const currentWeight: number = weights.get(currentNode)! + child[2]

			if (weights.has(child[1])) {
				weights.get(child[1])! > currentWeight ? weights.set(child[1], currentWeight) : null
			} else {
				weights.set(child[1], currentWeight)
			}
			console.log(weights)
			if (child[1] === end) {
				// check if exist potentialy shortest path
				if (minWeightNode(weights, visited) === child[1]) return weights.get(end)!
			}
		}

		currentNode = minWeightNode(weights, visited)
		visited.add(currentNode)
	}

	//default no route, id graph are not conected(have subgraphs)
	return -1
}

console.log(minGraphWeightBetweenTwoNodes(data.n, data.flights, data.src, data.dst))
