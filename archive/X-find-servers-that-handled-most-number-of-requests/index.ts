const _ = require('lodash')
import { data } from './data'

interface IServerTask {
	server: number
	disponibleAt: number
}

function busiestServers(k: number, arrival: number[], load: number[]): number[] {
	const serverFinishedTasks: number[] = new Array(k).fill(0)
	const serverTasks: IServerTask[] = Array.from(load.slice(0, k), (el, index) => {
		serverFinishedTasks[index]++
		return { server: index, disponibleAt: el + arrival[index] }
	})

	serverTasks.sort(sortTasks)

	function sortTasks(first: IServerTask, second: IServerTask) {
		return first.disponibleAt - second.disponibleAt
	}
	// If after pause exist potential servers
	function getServerAfterPause(from: number, to: number, lastUsedServer: number): number {
		let index = -1
		serverTasks.forEach((task, i) => {
			if (task.disponibleAt <= from) return -1
			else if (task.disponibleAt <= to && task.disponibleAt > from && task.server === lastUsedServer) {
				index = i
			}
		})

		return index
	}

	if (k < arrival.length) {
		let lastUsedServer = k - 1
		for (let i = k; i < arrival.length; i++) {
			let afterPause = arrival[i] - arrival[i - 1] > 1 ? true : false

			if (afterPause) {
				const serverIndex = getServerAfterPause(arrival[i - 1], arrival[i], lastUsedServer)
				if (serverIndex !== -1) {
					serverTasks[serverIndex].disponibleAt = arrival[i] + load[i]
					serverFinishedTasks[serverTasks[serverIndex].server]++
					serverTasks.sort(sortTasks)
				} else {
					afterPause = false
				}
			}
			if (serverTasks[0].disponibleAt > arrival[i]) continue
			else if (serverTasks[0].disponibleAt <= arrival[i] && !afterPause) {
				serverFinishedTasks[serverTasks[0].server]++
				serverTasks[0].disponibleAt = arrival[i] + load[i]
				lastUsedServer = serverTasks[0].server
				serverTasks.sort(sortTasks)
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
		const currentResult: number[] = busiestServers(el[0].k, el[0].arrival, el[0].load)
		console.log('----------------------------------------------------------')
		if (_.isEqual(currentResult, el[1])) {
			console.log(elementNr, el)
			console.log('Test passed;', 'output:', currentResult, 'expected:', el[1])
		} else {
			console.log(elementNr, el)
			console.log('Test failed;', 'output:', currentResult, 'expected:', el[1])
		}
	} else {
		let allPassed = true
		const notPassedArray: number[] = []
		data.forEach((el, index) => {
			const currentResult: number[] = busiestServers(el[0].k, el[0].arrival, el[0].load)
			console.log('----------------------------------------------------------')
			if (_.isEqual(currentResult, el[1])) {
				console.log(index, el)
				console.log('Test passed;', 'output:', currentResult, 'expected:', el[1])
			} else {
				console.log(index, el)
				console.log('Test failed;', 'output:', currentResult, 'expected:', el[1])
				allPassed = false
				notPassedArray.push(index)
			}
		})
		if (allPassed) console.log('All tests passed')
		else console.log('Some tests failed', notPassedArray)
	}
}

test(13)
// 7
test()
