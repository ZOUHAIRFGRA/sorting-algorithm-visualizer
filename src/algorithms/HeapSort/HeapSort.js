const BLUE = 0,
  YELLOW = 1,
  PURPLE = 2,
  RED = 3,
  PINK = 5,
  GREEN = 4;

  const HeapSort = (array, arraySteps, colorSteps) => {
    let n = array.length;
  
    // Build a max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(array, n, i, arraySteps, colorSteps);
    }
  
    // One by one extract elements from the heap
    for (let i = n - 1; i > 0; i--) {
      // Move the current root to the end
      const temp = array[0];
      array[0] = array[i];
      array[i] = temp;
  
      // Call max heapify on the reduced heap
      heapify(array, i, 0, arraySteps, colorSteps);
    }
  
    // Array is sorted
    arraySteps.push(array.slice());
    colorSteps.push(colorSteps[colorSteps.length - 1].fill(4));
  };
  
  const heapify = (array, n, i, arraySteps, colorSteps) => {
    let largest = i; // Initialize largest as root
    let left = 2 * i + 1; // left = 2*i + 1
    let right = 2 * i + 2; // right = 2*i + 2
  
    // If left child is larger than root
    if (left < n && array[left] > array[largest]) {
      largest = left;
    }
  
    // If right child is larger than largest so far
    if (right < n && array[right] > array[largest]) {
      largest = right;
    }
  
    // If largest is not root
    if (largest !== i) {
      // Swap the root with the largest element
      const temp = array[i];
      array[i] = array[largest];
      array[largest] = temp;
  
      // Recursively heapify the affected sub-tree
      heapify(array, n, largest, arraySteps, colorSteps);
    }
  
    arraySteps.push(array.slice());
    colorSteps.push(colorSteps[colorSteps.length - 1].fill(PINK, i, largest + 1));
    arraySteps.push(array.slice());
    colorSteps.push(colorSteps[colorSteps.length - 1].fill(GREEN, i, i + 1).fill(BLUE, largest));
  };
  
  export default HeapSort;
