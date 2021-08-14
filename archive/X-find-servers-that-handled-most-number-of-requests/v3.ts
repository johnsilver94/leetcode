import { data } from './data'
import { result } from './result'

function busiestServers(k: number, arrival: number[], load: number[]): number[] {
	const serverFinishedTasks: number[] = new Array(k).fill(0)
	const serverLoad: number[] = new Array(k).fill(0)

	console.log(serverLoad)
	console.log(arrival, load)
	for (let tick = arrival[0]; tick <= arrival[arrival.length - 1]; tick++) {
		console.log(tick)
		let loadAccepted = false
		let inPause = false

		if (tick === arrival[0]) arrival.shift()
		else inPause = true

		for (let j = 0; j < k; j++) {
			if (serverLoad[j] <= 0 && !loadAccepted && !inPause) {
				serverLoad[j] = load[0]
				load.shift()
				serverFinishedTasks[j]++
				loadAccepted = true
			}
			serverLoad[j]--
		}
	}

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
test(4)
// 4 7
// busiestServers(2, [1, 2, 3], [1_000_000_000, 1, 1_000_000_000])
