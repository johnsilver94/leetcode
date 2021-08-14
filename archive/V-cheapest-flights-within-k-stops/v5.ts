import { data } from './data'
import { result } from './result'

interface IQueue {
	node: number
	parent: number
	visited: number[]
	stops: number
	cost: number
}

function findCheapestPrice(n: number, flights: number[][], src: number, dst: number, k: number): number {
	const flightCostMatrix: number[][] = new Array(n).fill(0).map(() => new Array(n).fill(0))
	let cheapestPrice: number = Number.MAX_SAFE_INTEGER
	const queue: IQueue[] = [
		{
			node: src,
			parent: src,
			visited: [],
			stops: -1,
			cost: 0
		}
	]

	console.log(flightCostMatrix)
	flights.forEach((flight) => {
		console.log(flight)
		flightCostMatrix[flight[0]][flight[1]] = flight[2]
	})

	flightCostMatrix.forEach((el) => console.log(el))
	console.log('-----------------------------------------')

	while (queue.length > 0) {
		const visited: number[] = [...queue[0].visited]
		visited.push(queue[0].node)

		console.log('------------------------------------------------------')
		console.log(flightCostMatrix[queue[0].node], queue)
		console.log(queue[0].visited, queue[0].stops, queue[0].cost)
		console.log('------------------------------------------------------')
		for (let i = 0; i < flightCostMatrix[queue[0].node].length; i++) {
			if (flightCostMatrix[queue[0].node][i] !== 0 && !visited.includes(i)) {
				console.log(queue[0].node, i, flightCostMatrix[queue[0].node][i])
				if (queue[0].stops + 1 > k) continue
				if (i === dst) {
					const cost = queue[0].cost + flightCostMatrix[queue[0].node][i]
					if (cheapestPrice > cost) cheapestPrice = cost
					console.log('Cheapest price', cheapestPrice)
					continue
				}
				queue.push({
					node: i,
					parent: queue[0].node,
					visited: visited,
					stops: queue[0].stops + 1,
					cost: queue[0].cost + flightCostMatrix[queue[0].node][i]
				})
			}
		}
		queue.shift()
	}
	return cheapestPrice === Number.MAX_SAFE_INTEGER ? -1 : cheapestPrice
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
		data.forEach((el, i) => {
			const currentResult: number = findCheapestPrice(el.n, el.flights, el.src, el.dst, el.k)
			if (currentResult === result[i]) {
				console.log('Test passed', currentResult, result[i])
			} else console.log('Test failed', currentResult, result[i])
		})
	}
}

test(7)
// test()
