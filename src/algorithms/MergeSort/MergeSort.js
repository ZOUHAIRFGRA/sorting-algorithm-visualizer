const BLUE = 0,
	YELLOW = 1,
	PURPLE = 2,
	RED = 3,
	GREEN = 4,
	PINK = 5,
	ORANGE = 6;

// Global Variables
let globalArray = [],
	globalArraySteps = [],
	globalColorSteps = [];

const MergeSort = (array, arraySteps, colorSteps) => {
	globalArray = array;
	globalArraySteps = arraySteps;
	globalColorSteps = colorSteps;
	mergeSortHelper(0, array.length - 1);
};

const mergeSortHelper = (startIndex, endIndex) => {
	if (endIndex - startIndex <= 0) return;
	const midIndex = Math.floor((endIndex - startIndex) / 2);
	const leftArrayStartIndex = startIndex,
		leftArrayEndIndex = startIndex + midIndex,
		rightArrayStartIndex = leftArrayEndIndex + 1,
		rightArrayEndIndex = endIndex;

	mergeSortHelper(leftArrayStartIndex, leftArrayEndIndex);
	mergeSortHelper(rightArrayStartIndex, rightArrayEndIndex);
	merge(leftArrayStartIndex, rightArrayStartIndex, rightArrayEndIndex);
};

const merge = (
	leftArrayStartIndex,
	rightArrayStartIndex,
	rightArrayEndIndex
) => {
	// Add Purple color for left array, pink for right array
	let colorKey = [...globalColorSteps[0]];
	colorKey.fill(PURPLE, leftArrayStartIndex, rightArrayStartIndex);
	colorKey.fill(PINK, rightArrayStartIndex, rightArrayEndIndex + 1);
	globalColorSteps.push(colorKey.slice());
	globalArraySteps.push(globalArray.slice());

	let writePointer = leftArrayStartIndex,
		rightArrayPointer = rightArrayStartIndex;
	while (
		writePointer <= rightArrayPointer &&
		rightArrayPointer <= rightArrayEndIndex
	) {
		// Add orange color for writePointer and rightPointer
		// Orange color == items being compared
		// Other left and right array will have same color as above
		const colorKeyCopy = colorKey.slice();
		colorKey[writePointer] = YELLOW;
		colorKey[rightArrayPointer] = YELLOW;
		globalColorSteps.push(colorKey.slice());
		globalArraySteps.push(globalArray.slice());
		// Revert the orange colors for next iteration
		colorKey = colorKeyCopy;

		if (globalArray[writePointer] <= globalArray[rightArrayPointer]) {
			// Sorted half should be green
			colorKey[writePointer] = GREEN;
			writePointer++;
		} else {
			const temp = globalArray[rightArrayPointer];
			shiftArrayRightByOne(globalArray, writePointer, rightArrayPointer - 1);
			globalArray[writePointer] = temp;
			// Item at writePointer is sorted, so green
			colorKey[writePointer] = GREEN;
			writePointer++;
			rightArrayPointer++;
			colorKey.fill(PURPLE, writePointer, rightArrayPointer);
		}
		// Add color and steps array for current iteration
		globalColorSteps.push(colorKey.slice());
		globalArraySteps.push(globalArray.slice());
	}
	// At the end, add green color to signify a sorted merged array
	colorKey.fill(GREEN, leftArrayStartIndex, rightArrayEndIndex + 1);
	globalColorSteps.push(colorKey.slice());
	globalArraySteps.push(globalArray.slice());
};

const shiftArrayRightByOne = (array, startIndex, endIndex) => {
	for (let i = endIndex; i >= startIndex; i--) {
		array[i + 1] = array[i];
	}
};
export default MergeSort;
