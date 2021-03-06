const _ = require('lodash')
import { data } from './data'

function nearestExit(maze: string[][], entrance: number[]): number {
	const shortestExitPath = -1
	const H = maze.length
	const W = maze[0].length
	const s_row = entrance[0]
	const s_col = entrance[1]

	return shortestExitPath
}

function test(elementNr?: number): void {
	if (elementNr) {
		elementNr--
		const el = data[elementNr]
		console.log('----------------------------------------------------------')
		const currentResult: number = nearestExit(el.maze, el.entrance)
		if (_.isEqual(currentResult, el.result)) {
			// console.log(elementNr, el)
			console.log('Test passed;', 'output:', currentResult, 'expected:', el.result)
		} else {
			// console.log(elementNr, el)
			console.log('Test failed;', 'output:', currentResult, 'expected:', el.result)
		}
		console.log('----------------------------------------------------------')
	} else {
		let allPassed = true
		const notPassedArray: number[] = []
		data.forEach((el, index) => {
			console.log('----------------------------------------------------------')
			const currentResult: number = nearestExit(el.maze, el.entrance)
			if (_.isEqual(currentResult, el.result)) {
				// console.log(index, el)
				console.log('Test passed;', 'output:', currentResult, 'expected:', el.result)
			} else {
				// console.log(index, el)
				console.log('Test failed;', 'output:', currentResult, 'expected:', el.result)
				allPassed = false
				notPassedArray.push(index)
			}
			console.log('----------------------------------------------------------')
		})
		if (allPassed) console.log('All tests passed')
		else console.log('Some tests failed', notPassedArray)
	}
}

test()

// import { format, addMilliseconds, getMilliseconds } from 'date-fns'

// const time: Date = addMilliseconds(new Date(2020, 1, 1), 486497)
// const milliseconds: number = getMilliseconds(time)

// const formattedDate2: string = format(time, `mm:ss:${milliseconds}`)

// console.log(formattedDate2)
