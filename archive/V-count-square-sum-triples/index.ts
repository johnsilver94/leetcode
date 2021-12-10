const _ = require('lodash')
import { data } from './data'

function countTriples(n: number): number {
	let triplesCount = 0

	for (let i = 1; i <= n; i++) {
		for (let j = 1; j <= n; j++) {
			for (let k = 1; k <= n; k++) {
				if (i * i + j * j === k * k) {
					triplesCount++
				}
			}
		}
	}

	return triplesCount
}

function test(elementNr?: number): void {
	if (elementNr) {
		elementNr--
		const el = data[elementNr]
		console.log('----------------------------------------------------------')
		const currentResult: number = countTriples(el.n)
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
			const currentResult: number = countTriples(el.n)
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
