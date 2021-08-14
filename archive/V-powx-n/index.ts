const _ = require('lodash')
import { data } from './data'

// 5 digits after .
function myPow(x: number, n: number): number {
	let result = 1
	const k = n > 0 ? n : -1 * n

	for (let i = 1; i <= k; i++) {
		result = result * x
	}
	if (n < 0) {
		result = 1 / result
	}

	return parseFloat(Math.pow(x, n).toFixed(5))
}

function test(elementNr?: number): void {
	if (elementNr) {
		elementNr--
		const el = data[elementNr]
		console.log('----------------------------------------------------------')
		const currentResult: number = myPow(el.x, el.n)
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
			const currentResult: number = myPow(el.x, el.n)
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

test(4)
// 4 3
// test()
