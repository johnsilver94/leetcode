import { data } from './data'
import { result } from './result'

function busiestServers(k: number, arrival: number[], load: number[]): number[] {
	const serverFinishedTasks: number[] = new Array(k).fill(0)
	const serverTasks: number[] = new Array(k).fill(0)

	let lastUsedServer = 0
	for (let i = 0; i < arrival.length; i++) {
		let loadAccepted = false

		if (
			serverTasks[lastUsedServer] <= arrival[i] &&
			serverTasks.indexOf(arrival[i]) === serverTasks.lastIndexOf(arrival[i])
		) {
			serverTasks[lastUsedServer] = arrival[i] + load[i]
			serverFinishedTasks[lastUsedServer]++
		} else {
			for (let j = 0; j < k && !loadAccepted; j++) {
				if (serverTasks[j] <= arrival[i]) {
					serverTasks[j] = arrival[i] + load[i]
					serverFinishedTasks[j]++
					lastUsedServer = j
					loadAccepted = true
				}
			}
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

test()
// test(2)
// 4 7
// busiestServers(2, [1, 2, 3], [1_000_000_000, 1, 1_000_000_000])
