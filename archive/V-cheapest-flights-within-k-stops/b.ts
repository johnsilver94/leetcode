import { data } from './data'
import { result } from './result'

function findCheapestPrice(n: number, flights: number[][], src: number, dst: number, k: number): number {
	const flightsOrdered: number[][] = new Array(n).fill(0).map(() => new Array(n).fill(0))
	const flightTrimed: number[][] = []
	const costs: Map<number, number> = new Map<number, number>()
	const visited: Set<number> = new Set<number>()
	let airport = 0

	let levelPositions: number[] = [src]
	let k2 = k
	while (k2 > -1) {
		const newLevelPositsions: number[] = []
		let existValueOnLevel = false
		flights.forEach((flight) => {
			// console.log(flight)
			if (
				(levelPositions.includes(flight[0]) && !levelPositions.includes(flight[1])) ||
				(levelPositions.includes(flight[0]) && k2 === 0)
			) {
				flightTrimed.push(flight)
				newLevelPositsions.push(flight[1])
				existValueOnLevel = true
			}
		})
		if (!existValueOnLevel) {
			console.log('Not exist')
			return -1
		}
		levelPositions = newLevelPositsions
		k2--
	}

	console.log('---------------Trimed Cost Matrix--------------------------')
	flightTrimed.forEach((flight) => {
		flightsOrdered[flight[0]][flight[1]] = flight[2]
	})

	flightsOrdered.forEach((el) => console.log(el))

	visited.add(src)
	costs.set(dst, -1)
	flightsOrdered[src].forEach((el, i) => {
		if (el !== 0) {
			costs.set(i, el)
		}
	})
	airport = cheapestFlight(costs, visited)
	console.log('Airport', airport)

	while (airport !== -1) {
		const cost: number = costs.get(airport)!

		for (let i = 0; i < flightsOrdered[airport].length; i++) {
			if (flightsOrdered[airport][i] !== 0) {
				if (i === src) {
					console.log('!!!!!!!!!!!!!!!!!!Return to start')
					continue
				}
				const newCost: number = cost + flightsOrdered[airport][i]

				if (!costs.has(i) || costs.get(i)! == -1 || costs.get(i)! > newCost) {
					costs.set(i, newCost)
				}
			}
		}

		visited.add(airport)

		airport = cheapestFlight(costs, visited)
	}

	function cheapestFlight(costs: Map<number, number>, visited: Set<number>): number {
		let cheapest = -1
		let cheapestFlight = -1
		console.log('--------------------cheapestFlight---------------------')
		console.log(costs, visited)
		costs.forEach((el, i) => {
			console.log('map iterate', el, i)
			const isShortest: boolean = cheapest === -1 || el < cheapest
			if (isShortest && !visited.has(i)) {
				cheapest = el
				cheapestFlight = i
			}
		})
		console.log('Cheapest', cheapest)
		return cheapestFlight
	}

	return costs.get(dst)!
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
				allPassed = false
				console.log('Test failed', currentResult, result[i])
			}
		})
		if (allPassed) {
			console.log('All tests passed')
		} else {
			console.log('Some tests failed')
		}
	}
}

// test(7)
test()
