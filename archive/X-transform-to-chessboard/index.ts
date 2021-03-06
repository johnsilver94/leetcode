const _ = require('lodash')
import { data } from './data'

function movesToChessboard(board: number[][]): number {
	return 1
}
function test(elementNr?: number): void {
	if (elementNr) {
		elementNr--
		const el = data[elementNr]
		const currentResult: number = movesToChessboard(el.board)
		console.log('----------------------------------------------------------')
		if (_.isEqual(currentResult, el.result)) {
			console.log(elementNr, el)
			console.log('Test passed;', 'output:', currentResult, 'expected:', el.result)
		} else {
			console.log(elementNr, el)
			console.log('Test failed;', 'output:', currentResult, 'expected:', el.result)
		}
	} else {
		let allPassed = true
		const notPassedArray: number[] = []
		data.forEach((el, index) => {
			const currentResult: number = movesToChessboard(el.board)
			console.log('----------------------------------------------------------')
			if (_.isEqual(currentResult, el.result)) {
				console.log(index, el)
				console.log('Test passed;', 'output:', currentResult, 'expected:', el.result)
			} else {
				console.log(index, el)
				console.log('Test failed;', 'output:', currentResult, 'expected:', el.result)
				allPassed = false
				notPassedArray.push(index)
			}
		})
		if (allPassed) console.log('All tests passed')
		else console.log('Some tests failed', notPassedArray)
	}
}

// test(2)
test()
