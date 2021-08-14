import { data } from './data'
import { result } from './result'

function findCheapestPrice(n: number, flights: number[][], src: number, dst: number, k: number): number {
	let minFlightCost: number = Number.MAX_SAFE_INTEGER
	let directionArray: number[] = [src]
	let flightCosts: number[] = []
	const flightCostMatrix: number[][] = new Array(n).fill(0).map(() => new Array(n).fill(0))

	flights.forEach((flight) => {
		flightCostMatrix[flight[0]][flight[1]] = flight[2]
	})

	flightCostMatrix.forEach((el) => console.log(el))

	for (let j = 0; j < flightCostMatrix[src].length; j++) {
		if (flightCostMatrix[src][j] !== 0) {
			console.log(`row: ${src};index: ${j}; vallue: ${flightCostMatrix[src][j]}`)
			flightCosts.push(flightCostMatrix[src][j])
			if (!checkRoute(j, dst)) {
				console.log('Route not exist')
				console.log(directionArray, flightCosts)
				flightCosts = []
				directionArray = [src]
			} else {
				console.log('Route exist')
				console.log(directionArray, flightCosts)
				const flightCost = flightCosts.reduce((a, b) => a + b, 0)
				console.log(flightCost)
				if (minFlightCost > flightCost) minFlightCost = flightCost

				flightCosts = []
				directionArray = [src]
			}
		}
	}

	function checkRoute(from: number, to: number): boolean {
		directionArray.push(from)
		if (from === to) {
			return true
		}
		for (let i = 0; i < flightCostMatrix[from].length; i++) {
			if (flightCostMatrix[from][i] !== 0) {
				if (directionArray.length - 1 > k) return false
				console.log(`row: ${from};index: ${i}; vallue: ${flightCostMatrix[from][i]}`)
				flightCosts.push(flightCostMatrix[from][i])
				if (i === to) {
					directionArray.push(i)
					return true
				}
				if (!checkRoute(i, to)) {
					console.log('Route dont exist')
					console.log(directionArray, flightCosts)
					flightCosts.splice(-1)
					directionArray.splice(-1)
				} else {
					console.log('Route exist')
					console.log(directionArray, flightCosts)
					return true
				}
			}
		}
		return false
	}

	return minFlightCost === Number.MAX_SAFE_INTEGER ? -1 : minFlightCost
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
