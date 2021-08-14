const _ = require('lodash')
import { data } from './data'

function deckRevealedIncreasing(deck: number[]): number[] {
	const positionsMap: Map<number, number> = new Map<number, number>()

	function setFirstOddValueKey(newValue?: number): number {
		for (const [key, value] of positionsMap) {
			if (value % 2 !== 0) {
				positionsMap.delete(key)
				newValue ? positionsMap.set(key, newValue) : null
				return key
			}
		}
		return -1
	}

	if (deck.length <= 2) return deck

	deck.sort((a, b) => a - b)
	const deckIterator = deck.values()
	const result: number[] = []
	for (let i = 0; i < deck.length * 2 - 1; i++) {
		if (i % 2 === 0) {
			result.push(deckIterator.next().value)
		} else {
			result.push(0)
		}
	}

	for (let j = 0; j < deck.length * 2 - 1; j++) {
		if (j < deck.length) {
			if (j % 2 !== 0) positionsMap.set(j, j)
		} else {
			if (j % 2 === 0) result[setFirstOddValueKey()] = result[j]
			else setFirstOddValueKey(j)
		}
	}

	result.splice(deck.length)
	return result
}

function test(elementNr?: number): void {
	if (elementNr) {
		elementNr--
		const el = data[elementNr]
		console.log('----------------------------------------------------------')
		const currentResult: number[] = deckRevealedIncreasing(el.deck)
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
			const currentResult: number[] = deckRevealedIncreasing(el.deck)
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

// test(3)
// 4 3
test()
