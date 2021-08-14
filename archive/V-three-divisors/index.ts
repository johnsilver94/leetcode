const _ = require('lodash')
import { data } from './data'

function isThree(n: number): boolean {
	let divisors = 2
	for (let i = 1 + 1; i <= Math.floor(n / 2); i++) {
		if (n % i === 0) divisors++
		if (divisors > 3) return false
	}
	return divisors === 3 ? true : false
}

function test(elementNr?: number): void {
	if (elementNr) {
		elementNr--
		const el = data[elementNr]
		console.log('----------------------------------------------------------')
		const currentResult: boolean = isThree(el.n)
		if (_.isEqual(currentResult, el.result)) {
			console.log(elementNr, el)
			console.log('Test passed;', 'output:', currentResult, 'expected:', el.result)
		} else {
			console.log(elementNr, el)
			console.log('Test failed;', 'output:', currentResult, 'expected:', el.result)
		}
		console.log('----------------------------------------------------------')
	} else {
		let allPassed = true
		const notPassedArray: number[] = []
		data.forEach((el, index) => {
			console.log('----------------------------------------------------------')
			const currentResult: boolean = isThree(el.n)
			if (_.isEqual(currentResult, el.result)) {
				console.log(index, el)
				console.log('Test passed;', 'output:', currentResult, 'expected:', el.result)
			} else {
				console.log(index, el)
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

// test(4)
test()
