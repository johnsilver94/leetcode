import { data } from './data'
import { result } from './result'

function maxHappyGroups(batchSize: number, groups: number[]): number {
	let happyGroupsNr = 0
	const groupsMap: Map<number, number> = new Map<number, number>()
	let groupsSum = 0
	console.log(batchSize, groups)

	// Setup map
	for (let i = 0; i < groups.length; i++) {
		if (groups[i] % batchSize === 0) {
			happyGroupsNr++
			groups[i] = 0
		} else {
			if (groups[i] > batchSize) groups[i] = groups[i] % batchSize
			if (groupsMap.has(groups[i])) {
				groupsMap.set(groups[i], groupsMap.get(groups[i])! + 1)
			} else {
				groupsMap.set(groups[i], 1)
			}
		}
		groupsSum += groups[i]
	}

	console.log(groupsMap)

	// Search happy groups
	for (const [groupSize, groupCount] of groupsMap) {
		console.log(groupSize + ' = ' + groupCount)
		let nrOfGroupsRemains = groupCount

		for (let i = 1; i <= nrOfGroupsRemains && groupsMap.size > 1; i++) {
			const remainsInBatch = batchSize - i * groupSize

			for (let j = remainsInBatch; j >= 1; j--) {
				// number is divisor
				if (remainsInBatch % j === 0 && groupsMap.has(j)) {
					const friendGroupNeed = remainsInBatch / j
					const friendGroupCount = groupsMap.get(j)!
					let multiplicator = 1

					if (j !== groupSize && friendGroupNeed <= friendGroupCount) {
						if (friendGroupCount > 1) {
							const composedGroups = Math.floor(nrOfGroupsRemains / i)
							multiplicator = Math.min(friendGroupCount, composedGroups)
						}

						nrOfGroupsRemains -= multiplicator
						friendGroupCount - multiplicator > 0
							? groupsMap.set(j, friendGroupCount - multiplicator)!
							: groupsMap.delete(j)
						nrOfGroupsRemains > 0 ? groupsMap.set(groupSize, nrOfGroupsRemains) : groupsMap.delete(groupSize)
						happyGroupsNr += multiplicator
						groupsSum -= batchSize * multiplicator
						if (batchSize > groupsSum) {
							groupsSum > 0 ? happyGroupsNr++ : null
							return happyGroupsNr
						}
					}
				}
			}
		}

		if (batchSize % groupSize === 0 && groupsMap.has(groupSize)) {
			const div: number = batchSize / groupSize
			const nrOfGroups = groupsMap.get(groupSize)!
			let multiplicator = 1
			multiplicator = Math.floor(nrOfGroups / div)
			if (nrOfGroups >= div) {
				nrOfGroupsRemains = nrOfGroups % div
				happyGroupsNr += multiplicator
			}
			groupsSum -= multiplicator * div
			nrOfGroupsRemains > 0 ? groupsMap.set(groupSize, nrOfGroupsRemains) : groupsMap.delete(groupSize)
			if (batchSize > groupsSum) {
				groupsSum > 0 ? happyGroupsNr++ : null
				return happyGroupsNr
			}
		}
	}
	if (groupsMap.size > 0) happyGroupsNr++

	console.log(groups, groupsMap)
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

test()
// test(14)
