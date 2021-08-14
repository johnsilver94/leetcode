import { data } from './data'
import { result } from './result'

const minCostNode = (
	costs: Map<number, number>,
	lengths: Map<number, number>,
	visited: Set<number>,
	maxLength: number,
	end: number
): number => {
	let minCost = Number.MAX_SAFE_INTEGER
	let minCostNode = -1
	console.log('--------------------minCostNode------------------------')
	console.log(costs, lengths, visited)
	costs.forEach((cost, index) => {
		const lengthToNode = lengths.get(index)!
		if (!visited.has(index) && cost < minCost && lengthToNode - 1 < maxLength) {
			minCost = cost
			minCostNode = index
		}
	})

	if (minCost === Number.MAX_SAFE_INTEGER && costs.has(end)) {
		minCost = costs.get(end)!
		minCostNode = end
	}
	console.log(minCost, minCostNode)
	console.log('--------------------minCostNode------------------------')
	return minCostNode
}

function findCheapestPrice(n: number, flights: number[][], src: number, dst: number, k: number): number {
	const sortedGraph: { [key: number]: number[][] } = {}
	const costs: Map<number, number> = new Map<number, number>().set(src, 0)
	const lengths: Map<number, number> = new Map<number, number>().set(src, 0)
	const visited: Set<number> = new Set<number>().add(src)
	let currentNode: number = src

	let canEnd = false
	let canStart = false
	for (let i = 0; i < n; i++) {
		sortedGraph[i] = []
	}
	flights.forEach((el) => {
		sortedGraph[el[0]].push(el)

		if (el[0] === src) canStart = true
		if (el[1] === dst) canEnd = true
	})
	console.log(canStart, canEnd)
	if (!canStart && !canEnd) return -1

	console.log('-----Sorted Graph-----')
	console.log(sortedGraph)

	while (currentNode !== -1) {
		console.log(sortedGraph[currentNode])

		// check if exist potentialy less cost path
		if (currentNode === dst && lengths.get(dst)! <= k + 1) return costs.get(dst)!

		for (let i = 0; i < sortedGraph[currentNode].length; i++) {
			const child = sortedGraph[currentNode][i]
			console.log(child)
			const currentCost: number = costs.get(currentNode)! + child[2]
			const currentLength: number = lengths.get(currentNode)! + 1

			// Set shortest route for destination
			if (lengths.has(child[1])) {
				lengths.get(child[1])! > currentLength ? lengths.set(child[1], currentLength) : null
			} else {
				lengths.set(child[1], currentLength)
			}

			// Set lowest cost for destination
			if (costs.has(child[1])) {
				costs.get(child[1])! > currentCost ? costs.set(child[1], currentCost) : null
			} else {
				costs.set(child[1], currentCost)
			}
			console.log(costs)
		}

		currentNode = minCostNode(costs, lengths, visited, k, dst)
		visited.add(currentNode)
	}

	return -1
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
test(5)
