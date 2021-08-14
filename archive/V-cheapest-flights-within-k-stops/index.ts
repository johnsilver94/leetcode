import { data } from './data'
import { result } from './result'

interface INodeQueue {
	node: number
	parrent: number
	visited: number[]
	weight: number
}

const bestRoute = (queue: INodeQueue[]): [INodeQueue, number] => {
	let bestOption: INodeQueue = queue[0]
	let besOptionPosition = 0
	// Search cost less route
	queue.forEach((el, index) => {
		if (el.weight < bestOption.weight) {
			bestOption = el
			besOptionPosition = index
		}
	})

	// Find potentialy route with the same cost but short
	queue.forEach((el, index) => {
		if (el.weight === bestOption.weight && el.visited.length < bestOption.visited.length) {
			bestOption = el
			besOptionPosition = index
		}
	})
	return [bestOption, besOptionPosition]
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
		let bestFromQueue: INodeQueue
		let bestFromQueuePosition = 0
		const routeCosts: number[] = []
		let canEnd = false
		for (let i = 0; i < verticesNr; i++) {
			sortedGraph[i] = []
		}
		graph.forEach((el) => {
			sortedGraph[el[0]].push(el)
			if (el[1] === dst) canEnd = true
		})
		console.log(sortedGraph)

		console.log('--------------------First Verticle---------------------')
		console.log(sortedGraph[start])
		if (sortedGraph[start].length === 0 || !canEnd) return -1
		queue.push({ node: start, parrent: -1, visited: [], weight: 0 })
		bestFromQueue = queue[0]

		console.log('--------------------Queue---------------------')
		while (bestFromQueue) {
			console.log(sortedGraph[bestFromQueue.node])
			const preQueue: INodeQueue[] = []

			if (bestFromQueue.node === end) return bestFromQueue.weight
			const newVisited: number[] = [...bestFromQueue.visited, bestFromQueue.node]

			if (newVisited.length <= maxLength + 1) {
				for (let j = 0; j < sortedGraph[bestFromQueue.node].length; j++) {
					const childNode = sortedGraph[bestFromQueue.node][j]
					const weight = bestFromQueue.weight + childNode[2]
					if (childNode[1] === end) {
						console.log('Finded:', weight)
						routeCosts.push(weight)
						preQueue.push({
							node: childNode[1],
							parrent: childNode[0],
							visited: newVisited,
							weight: bestFromQueue.weight + childNode[2]
						})
					} else {
						if (
							sortedGraph[childNode[1]].length > 0 &&
							newVisited.length < maxLength + 1 &&
							!newVisited.includes(childNode[1])
						) {
							preQueue.push({
								node: childNode[1],
								parrent: childNode[0],
								visited: newVisited,
								weight: bestFromQueue.weight + childNode[2]
							})
						}
					}
				}
			}

			queue.splice(bestFromQueuePosition, 1)
			queue = queue.concat(preQueue)
			// need to be modified
			const bestRouteInfo: [INodeQueue, number] = bestRoute(queue)
			bestFromQueue = bestRouteInfo[0]
			bestFromQueuePosition = bestRouteInfo[1]
			console.log('--------------------New Queue---------------------')
			console.log(queue)
		}
		const minWeight: number = Math.min(...routeCosts)
		console.log(routeCosts, minWeight)
		return !routeCosts.length ? -1 : minWeight
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

test()
// test(1)
