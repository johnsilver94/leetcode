import { data } from './data'
import { result } from './result'

function maxHappyGroups(batchSize: number, groups: number[]): number {
	let markedValuePositions: Set<number> = new Set<number>()
	let markedPosibleValuePositions: Set<number> = new Set<number>()
	let happyGroupsNr = 0
	const finished = false
	console.log(batchSize, groups)

	function checkIfCanConsumeBatch(remainingInBatch: number, group: number): void {
		// const div = group / batchSize
		// remainingInBatch = Math.ceil(group / batchSize) -group
		remainingInBatch = batchSize - group

		console.log(remainingInBatch)
		const secondGroupIndex = groups.indexOf(remainingInBatch)
		if (secondGroupIndex > -1 && !markedValuePositions.has(secondGroupIndex)) {
			markedPosibleValuePositions.add(secondGroupIndex)
			markedValuePositions = new Set([...markedValuePositions, ...markedPosibleValuePositions])
			happyGroupsNr++
		} else {
			markedPosibleValuePositions = new Set<number>().add(secondGroupIndex)
			checkIfCanConsumeBatch(remainingInBatch, groups[secondGroupIndex])
		}
	}

	groups.forEach((group, index) => {
		if (!markedValuePositions.has(index)) {
			if (group % batchSize === 0) {
				happyGroupsNr++
				markedValuePositions.add(index)
			} else {
				markedPosibleValuePositions.add(index)
				checkIfCanConsumeBatch(batchSize, group)
			}
		}
	})

	// remove markedValuePositions from array
	console.log(markedValuePositions)
	if (markedValuePositions.size < groups.length) happyGroupsNr++

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
test(1)
