const _ = require('lodash')
import { data } from './data'

function restoreIpAddresses(s: string): string[] {
	const results: string[] = []
	const maxNumber = 255

	if (s.length < 4) {
		return results
	} else {
		createPossibleGroups('', s, 4)
	}

	function createPossibleGroups(initialString: string, stringInput: string, groupsRemains: number): void {
		let maxGroupLength = stringInput.length - (groupsRemains - 1)
		maxGroupLength > 3 ? (maxGroupLength = 3) : null
		let minGroupLength = stringInput.length - (groupsRemains - 1) * 3
		minGroupLength < 1 ? (minGroupLength = 1) : null

		if (groupsRemains > 1) {
			if (stringInput.charAt(0) === '0') {
				createPossibleGroups(initialString + '0' + '.', stringInput.slice(1), groupsRemains - 1)
			} else {
				for (let i = minGroupLength; i <= maxGroupLength; i++) {
					if (i !== 3 || (i === 3 && parseInt(stringInput.slice(0, i)) <= maxNumber))
						createPossibleGroups(initialString + stringInput.slice(0, i) + '.', stringInput.slice(i), groupsRemains - 1)
				}
			}
		} else {
			if (stringInput.length < 3 || (stringInput.length === 3 && parseInt(stringInput) <= maxNumber)) {
				stringInput.length > 1 && stringInput.charAt(0) === '0' ? null : results.push(initialString + stringInput)
			}
		}
	}
	return results
}
function test(elementNr?: number): void {
	if (elementNr) {
		elementNr--
		const el = data[elementNr]
		console.log('----------------------------------------------------------')
		const currentResult: string[] = restoreIpAddresses(el.s)
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
			const currentResult: string[] = restoreIpAddresses(el.s)
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
