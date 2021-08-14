import { data } from './data'
import { result } from './result'

function busiestServers(k: number, arrival: number[], load: number[]): number[] {
	const serverFinishedTasks: number[] = new Array(k).fill(0)
	const serverLoad: number[] = new Array(k).fill(0)
	let i = 0
	let arrivalDelay: number

	console.log(serverLoad)
	console.log(arrival, load)
	do {
		let loadAccepted = false
		console.log(arrival[i])
		arrivalDelay = arrival[i + 1] - arrival[i]
		console.log('arrival:', arrivalDelay)
		for (let j = 0; j < k; j++) {
			if (serverLoad[j] <= 0 && !loadAccepted) {
				serverLoad[j] = load[i]
				serverFinishedTasks[j]++
				loadAccepted = true
			}
			serverLoad[j] -= arrivalDelay
		}

		if (arrivalDelay > 1) {
			for (let j = 0; j < k; j++) {
				serverLoad[j] -= arrivalDelay
			}
		}
		i++
	} while (i < arrival.length)

	const maxLoad: number = Math.max(...serverFinishedTasks)
	const serverWithMaxLoad: number[] = []
	serverFinishedTasks.forEach((server, index) => {
		if (maxLoad === server) serverWithMaxLoad.push(index)
	})

	return serverWithMaxLoad
}

function test(elementNr?: number): void {
	if (elementNr) {
		elementNr--
		const el = data[elementNr]
		const currentResult: number[] = busiestServers(el.k, el.arrival, el.load)
		if (currentResult === result[elementNr]) {
			console.log('Test passed', currentResult, result[elementNr])
		} else console.log('Test failed', currentResult, result[elementNr])
	} else {
		let allPassed = true
		data.forEach((el, i) => {
			const currentResult: number[] = busiestServers(el.k, el.arrival, el.load)
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
test(7)
// 4 7
// busiestServers(2, [1, 2, 3], [1_000_000_000, 1, 1_000_000_000])
