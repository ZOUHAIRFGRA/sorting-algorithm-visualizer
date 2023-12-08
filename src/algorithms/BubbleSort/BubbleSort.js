const BLUE = 0,
  YELLOW = 1,
  PURPLE = 2,
  RED = 3,
  PINK = 5,
  GREEN = 4;

const BubbleSort = (array, arraySteps, colorSteps) => {
  let colorKey = [...colorSteps[0]];
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      // Highlight the current elements being compared
      arraySteps.push(array.slice());
      colorKey[j] = PURPLE;
      colorKey[j + 1] = PURPLE;
      colorSteps.push(colorKey.slice());

      // Swap if the element found is greater than the next element
      if (array[j] > array[j + 1]) {
        arraySteps.push(array.slice());
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        colorKey[j] = PINK;
        colorKey[j + 1] = PINK;
        colorSteps.push(colorKey.slice());

        arraySteps.push(array.slice());
        colorKey[j] = BLUE; // Revert color
        colorKey[j + 1] = BLUE; // Revert color
        colorSteps.push(colorKey.slice());
      } else {
        // Revert color if no swap is needed
        arraySteps.push(array.slice());
        colorKey[j] = BLUE; // Revert color
        colorKey[j + 1] = BLUE; // Revert color
        colorSteps.push(colorKey.slice());
      }
    }
    // Mark the last element as sorted
    arraySteps.push(array.slice());
    colorKey[array.length - 1 - i] = GREEN;
    colorSteps.push(colorKey.slice());
  }
  arraySteps.push(array.slice());
  colorSteps.push(colorKey.slice().fill(4));
};

export default BubbleSort;
