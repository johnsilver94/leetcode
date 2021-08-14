const _ = require('lodash')
import { data } from './data'

function deckRevealedIncreasing(deck: number[]): number[] {
	const sortAscending = (a: number, b: number) => {
		return a - b
	}

	if (deck.length <= 2) return deck

	const deckCopy: number[] = [...deck]
	deckCopy.sort(sortAscending)
	const arrangeCards = (deck: number[], order: number): number[] => {
		if (deck.length === 1) return deck

		const splitPosition: number = Math.ceil(deck.length / 2)
		const first: number[] = deck.slice(0, splitPosition)
		const second: number[] = arrangeCards(deck.slice(splitPosition), order === 0 ? 1 : 0)

		const result = Array(deck.length)
		const firstIterator = first.values()
		const secondIterator = second.values()
		for (let i = 0; i < deck.length; i++) {
			if (i % 2 === order) result[i] = firstIterator.next().value
			else result[i] = secondIterator.next().value
		}
		return result
	}
	const result = arrangeCards(deckCopy, 0)
	return result
}

function test(elementNr?: number): void {
	if (elementNr) {
		elementNr--
		const el = data[elementNr]
		console.log('----------------------------------------------------------')
		const currentResult: number[] = deckRevealedIncreasing(el.deck)
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
			const currentResult: number[] = deckRevealedIncreasing(el.deck)
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

test(1)
// 1 4
// test()
