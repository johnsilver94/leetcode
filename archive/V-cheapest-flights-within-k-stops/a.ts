import { data } from './data'
import { result } from './result'

interface INodeQueue {
	node: number
	parrent: number
	visited: number
	weight: number
}

function findCheapestPrice(n: number, flights: number[][], src: number, dst: number, k: number): number {
	function shortestPathWithMaxLength(
		verticesNr: number,
		graph: number[][],
		start: number,
		end: number,
		maxLength: number
	): number {
		const sortedGraph: { [key: number]: number[][] } = {}
		let queue: INodeQueue[] = []
		let minWeight = Number.MAX_SAFE_INTEGER

		for (let i = 0; i < verticesNr; i++) {
			sortedGraph[i] = []
		}
		graph.forEach((el) => {
			sortedGraph[el[0]].push(el)
		})
		console.log(sortedGraph)

		console.log('--------------------First Verticle---------------------')
		console.log(sortedGraph[start])
		if (sortedGraph[start].length === 0 || sortedGraph[end].length) return -1
		queue.push({ node: start, parrent: -1, visited: 0, weight: 0 })

		console.log('--------------------Queue---------------------')
		while (queue.length) {
			console.log(sortedGraph[queue[0].node])
			const preQueue: INodeQueue[] = []
			const findEnd = false

			const newVisited: number = queue[0].visited + 1

			if (newVisited <= maxLength + 1) {
				for (let j = 0; j < sortedGraph[queue[0].node].length && !findEnd; j++) {
					const childNode = sortedGraph[queue[0].node][j]
					const weight = queue[0].weight + childNode[2]
					if (childNode[1] === end) {
						minWeight = weight < minWeight ? weight : minWeight
						console.log('Finded:', minWeight)
						// findEnd = true
					} else {
						if (sortedGraph[childNode[1]].length > 0 && minWeight > weight) {
							preQueue.push({
								node: childNode[1],
								parrent: childNode[0],
								visited: newVisited,
								weight: queue[0].weight + childNode[2]
							})
						}
					}
				}
			}
			queue.shift()
			findEnd ? null : (queue = queue.concat(preQueue))
			console.log('--------------------New Queue---------------------')
			console.log(queue)
		}
		console.log(minWeight)
		return minWeight === Number.MAX_SAFE_INTEGER ? -1 : minWeight
	}

	return shortestPathWithMaxLength(n, flights, src, dst, k)
}

function test(elementNr?: number): void {
	if (elementNr) {
		elementNr--
		const el = data[elementNr]
		const currentResult: number = findCheapestPrice(el.n, el.flights, el.src, el.dst, el.k)
		if (currentResult === result[elementNr]) {
			console.log('Test passed', currentResult, result[elementNr])
		} else console.log('Test failed', currentResult, result[elementNr])
	} else {
		let allPassed = true
		data.forEach((el, i) => {
			const currentResult: number = findCheapestPrice(el.n, el.flights, el.src, el.dst, el.k)
			if (currentResult === result[i]) {
				console.log('Test passed', currentResult, result[i])
			} else {
				console.log('Test failed', currentResult, result[i])
				allPassed = false
			}
		})
		if (allPassed) console.log('All tests passed')
		else console.log('Some tests failed')
	}
}

// test()
test(8)
