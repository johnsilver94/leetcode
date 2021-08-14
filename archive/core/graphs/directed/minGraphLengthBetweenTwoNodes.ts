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

const minLengthNode = (lengths: Map<number, number>, visited: Set<number>): number => {
	let minLength = 0
	let minLengthNode = -1
	console.log(lengths, visited)
	lengths.forEach((length, index) => {
		if (!visited.has(index) && (minLength === 0 || length < minLength)) {
			minLength = length
			minLengthNode = index
		}
	})
	console.log(minLength, minLengthNode)
	return minLengthNode
}

const minGraphLengthBetweenTwoNodes = (nodes: number, graph: number[][], start: number, end: number): number => {
	const sortedGraph: { [key: number]: number[][] } = {}
	const lengths: Map<number, number> = new Map<number, number>().set(start, 0)
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
			const currentLength: number = lengths.get(currentNode)! + 1

			if (lengths.has(child[1])) {
				lengths.get(child[1])! > currentLength ? lengths.set(child[1], currentLength) : null
			} else {
				lengths.set(child[1], currentLength)
			}
			console.log(lengths)
			if (child[1] === end) {
				// check if exist potentialy shortest path
				if (minLengthNode(lengths, visited) === child[1]) return lengths.get(end)!
			}
		}

		currentNode = minLengthNode(lengths, visited)
		visited.add(currentNode)
	}

	//default no route, id graph are not conected(have subgraphs)
	return -1
}

console.log(minGraphLengthBetweenTwoNodes(data.n, data.flights, data.src, data.dst))
