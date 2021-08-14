import { data } from './data'
import { result } from './result'

function maxHappyGroups(batchSize: number, groups: number[]): number {
	let happyGroupsNr = 0
	let cycles = 2
	console.log(batchSize, groups)

	const canConsumeBatchWithSomeone = (inBatch: number, groupIndex: number): boolean => {
		if (groups[groupIndex] < batchSize) {
			const remainingInBatch = inBatch - groups[groupIndex]
			const friendGroupIndex = groups.indexOf(remainingInBatch)
			if (friendGroupIndex > -1 && friendGroupIndex !== groupIndex) {
				happyGroupsNr++
				groups[groupIndex] = 0
				groups[friendGroupIndex] = 0
				return true
			} else {
				const minGroup: number = Math.min(...groups)
				const minGroupIndex: number = groups.indexOf(minGroup)
				groups[minGroupIndex] = 0
				if (minGroup !== 0 && minGroup < remainingInBatch) {
					canConsumeBatchWithSomeone(remainingInBatch - minGroup, minGroupIndex)
				}
			}
		}
		return false
	}

	groups.sort((a, b) => a - b)
	console.log(groups)
	while (cycles) {
		for (let i = 0; i < groups.length; i++) {
			if (groups[i] !== 0) {
				if (groups[i] % batchSize === 0) {
					groups[i] = 0
					happyGroupsNr++
				} else if (groups[i] < batchSize) {
					canConsumeBatchWithSomeone(batchSize, i)
				} else {
					groups[i] = (Math.ceil(groups[i] / batchSize) * batchSize) % groups[i]
				}
			}
		}
		cycles--
	}

	if (Math.max(...groups) !== 0) happyGroupsNr++
	// remove markedValuePositions from array

	console.log(groups)
	return happyGroupsNr
}

function test(elementNr?: number): void {
	if (elementNr) {
		elementNr--
		const el = data[elementNr]
		const currentResult: number = maxHappyGroups(el.batchSize, el.groups)
		if (currentResult === result[elementNr]) {
			console.log('Test passed', currentResult, result[elementNr])
		} else console.log('Test failed', currentResult, result[elementNr])
	} else {
		let allPassed = true
		data.forEach((el, i) => {
			const currentResult: number = maxHappyGroups(el.batchSize, el.groups)
			if (currentResult === result[i]) {
				console.log('Test passed', currentResult, result[i])
			} else {
				console.log('Test failed', currentResult, result[i])
				allPassed = false
			}
		})
		if (allPassed) console.log('All tests passed')
		else console.log('Some tests failed')
	}
}

// test()
test(5)
