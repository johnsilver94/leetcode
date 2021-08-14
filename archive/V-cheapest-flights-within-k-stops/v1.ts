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

// console.log(findCheapestPrice(
//     5,
//     [[1,2,10],[2,0,7],[1,3,8],[4,0,10],[3,4,2],[4,2,10],[0,3,3],[3,1,6],[2,4,5]],
//     0,
//     4,
//     1))
// console.log(findCheapestPrice(
//     3,
//     [[0,1,100],[1,2,100],[0,2,500]],
//     0,
//     2,
//     1))
// console.log(findCheapestPrice(
//     3,
//     [[0,1,100],[1,2,100],[0,2,500]],
//     0,
//     2,
//     0))
// console.log(findCheapestPrice(
//     10,
//     [[3,4,4],[2,5,6],[4,7,10],[9,6,5],[7,4,4],[6,2,10],[6,8,6],[7,9,4],[1,5,4],[1,0,4],[9,7,3],[7,0,5],[6,5,8],[1,7,6],[4,0,9],[5,9,1],[8,7,3],[1,2,6],[4,1,5],[5,2,4],[1,9,1],[7,8,10],[0,4,2],[7,2,8]],
//     6,
//     0,
//     7))
console.log(
	findCheapestPrice(
		5,
		[
			[0, 1, 5],
			[1, 2, 5],
			[0, 3, 2],
			[3, 1, 2],
			[1, 4, 1],
			[4, 2, 1]
		],
		0,
		2,
		2
	)
)
