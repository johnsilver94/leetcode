const _ = require('lodash')
import { data } from './data'

function numEquivDominoPairs(dominoes: number[][]): number {
	let nrOfPairs = 0
	for (let i = 0; i < dominoes.length; i++) {
		for (let j = i + 1; j < dominoes.length; j++) {
			if (
				(dominoes[i][0] === dominoes[j][0] && dominoes[i][1] === dominoes[j][1]) ||
				(dominoes[i][0] === dominoes[j][1] && dominoes[i][1] === dominoes[j][0])
			) {
				nrOfPairs++
			}
		}
	}
	return nrOfPairs
}

function test(elementNr?: number): void {
	if (elementNr) {
		elementNr--
		const el = data[elementNr]
		const currentResult: number = numEquivDominoPairs(el[0].dominoes)
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
			const currentResult: number = numEquivDominoPairs(el[0].dominoes)
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

// test(2)
test()
