import { data } from './data'
import { result } from './result'

function findCheapestPrice(n: number, flights: number[][], src: number, dst: number, k: number): number {
	const flightCostMatrix: number[][] = new Array(n).fill(0).map(() => new Array(n).fill(0))

	flights.forEach((flight) => {
		flightCostMatrix[flight[0]][flight[1]] = flight[2]
	})

	flightCostMatrix.forEach((el) => console.log(el))
	console.log('-----------------------------------------')

	function dijkstra(matrix: number[][], current: number, destination: number, maxPath: number): void {
		const visited = new Set<number>()
		const stops: number[] = new Array(n).fill(-1) // nr of stops
		const cost: number[] = new Array(n).fill(0) // cost of fligth to
		let canSearch = true

		while (canSearch) {
			console.log(visited, stops, cost)
			checkFlightsFrom(matrix[current], current)

			canSearch = false
		}

		function checkFlightsFrom(fromFlights: number[], index: number) {
			visited.add(index)
			console.log('-----------------checkFlightFrom------------------------')
			for (let i = 0; i < fromFlights.length; i++) {
				if (fromFlights[i] !== 0 && !visited.has(i) && stops[i] < 0) {
					console.log(fromFlights[i], index)
					stops[i] = stops[index] + 1
					if (stops[i] > maxPath) continue
					cost[i] = fromFlights[i] + cost[index]
					console.log('Index:' + index, fromFlights, visited, stops, cost)
					if (i === destination) {
						console.log(`Find End; steps:${stops[i]}; cost:${cost[i]}`)

						continue
					}
				}
			}
		}
	}

	// function minMapValuePostion(arr: number[]): number {
	// 	console.log('-----------------------minMapValuePostion-----------------------------')
	// 	console.log(arr)
	// 	return 1
	// }

	dijkstra(flightCostMatrix, src, dst, k)

	return 1
}

function test(elementNr: number): void {
	elementNr--
	if (elementNr) {
		const el = data[elementNr]
		const currentResult = findCheapestPrice(el.n, el.flights, el.src, el.dst, el.k)
		if (currentResult === result[elementNr]) {
			console.log('Test passed', currentResult, result[elementNr])
		}
		console.log('Test failed', currentResult, result[elementNr])
	} else {
		data.forEach((el, i) => {
			console.log(el, i)
		})
	}
}

test(5)
