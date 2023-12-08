import "./App.css";
import Bar from "./components/bar/Bar";
import Footer from "./components/footer/Footer";
import Navbar from "./components/nav/Navbar";
import { useState, useEffect } from "react";
import InsertionSort from "./algorithms/InsertionSort/InsertionSort";
import MergeSort from "./algorithms/MergeSort/MergeSort";
import QuickSort from "./algorithms/QuickSort/QuickSort";
import BubbleSort from "./algorithms/BubbleSort/BubbleSort";
import HeapSort from "./algorithms/HeapSort/HeapSort";

const App = () => {
  // States
  const [array, setArray] = useState([]);
  const [arraySteps, setArraySteps] = useState([]);
  const [colorSteps, setColorSteps] = useState([]);
  const [arraySize, setArraySize] = useState(50);
  const [currentStep, setCurrentStep] = useState(0);
  const [delay, setDelay] = useState(50);
  const [algorithm, setAlgorithm] = useState("Merge Sort");
  const [timeouts, setTimeouts] = useState([]);
  const [startGeneratingSteps, setStartGeneratingSteps] = useState(false);
  const [sortingInProgress, setSortingInProgress] = useState(false);

  // returns an array of n numbers where n =arraySize
  const generateRandomArray = () => {
    let randomArray = [];
    for (let i = 0; i < arraySize; i++) {
      randomArray.push(Math.floor(Math.random() * 100) + 10);
    }
    return randomArray;
  };

  // clear color key and set it to default
  // TODO: Refactor this
  const clearKey = () => {
    let blankKey = new Array(arraySize).fill(0);
    setColorSteps([blankKey]);
  };

  // generates steps
  // TODO: Refactor this
  const generateSteps = () => {
    console.log(`generating steps`);
    let arr = [...array];
    let steps = [array.slice()];
    let clrSteps = [...colorSteps];
    sort(arr, steps, clrSteps);
    setArraySteps(steps);
    setColorSteps(clrSteps);
    setStartGeneratingSteps(false); // after generating steps, set it to false
  };

  const sort = (array, arraySteps, colorSteps) => {
    switch (algorithm) {
      case "Merge Sort":
        MergeSort(array, arraySteps, colorSteps);
        break;
      case "Quick Sort":
        QuickSort(array, arraySteps, colorSteps);
        break;
      case "Insertion Sort":
        InsertionSort(array, arraySteps, colorSteps);
        break;
      case "Bubble Sort": // Add the case for Bubble Sort
        BubbleSort(array, arraySteps, colorSteps);
        break;
      case "Heap Sort": // Add the case for Bubble Sort
        HeapSort(array, arraySteps, colorSteps);
        break;
      default:
        console.error("Invalid algorithm selected!");
    }
  };

  // returns the sorting algorithm delay speed using formula
  // formula: speed = 500/arraySize
  const getDelay = (arraySize) => {
    return Math.floor(1000 / arraySize);
  };

  // Initializes the app by generating random array
  const initialize = () => {
    const newArray = generateRandomArray();
    setArray(newArray);
    setArraySteps([newArray]);
    setCurrentStep(0);
    setDelay(getDelay(arraySize));
    clearKey();
    clearTimeouts();
    setStartGeneratingSteps(true); //invoke start generating steps
  };

  const initialize_with_current_array = () => {
    const arrayCopy = array.slice();
    setArraySteps([arrayCopy]);
    setCurrentStep(0);
    setDelay(getDelay(arraySize));
    clearKey();
    clearTimeouts();
    setStartGeneratingSteps(true); //invoke start generating steps

    //console.log(`inside initialize with current array: ${array}`);
    // setArraySteps([array]);
    // setCurrentStep(0);
    // setDelay(getDelay(arraySize));
    // clearKey();
    // clearTimeouts();
    // generateSteps();
  };

  // change size of random array and corresponding sorting speed
  const handleArraySizeAndSpeedChange = (newArraySize) => {
    const newDelay = getDelay(newArraySize);
    setArraySize(newArraySize);
    setDelay(newDelay);
  };

  // clear timeouts
  const clearTimeouts = () => {
    timeouts.forEach((timeout) => clearTimeout(timeout));
    setTimeouts([]);
    console.log(`Timeouts cleared...`);
  };

  // start playing sort animation
  const startSorting = () => {
    // If sorting is already in progress, ignore additional clicks
    if (sortingInProgress) {
      console.log("Sorting is already in progress. Please wait.");
      return;
    }

    setSortingInProgress(true);
    let timeoutsArray = [];
    let currStep = currentStep;

    // If already at sorted state, just return
    if (currentStep === arraySteps.length - 1) {
      setSortingInProgress(false);
      return;
    }

    for (let i = 0; i < arraySteps.length; i++) {
      let timeout = setTimeout(() => {
        setArray([...arraySteps[i]]);
        setCurrentStep(currStep++);
      }, delay * (i + 1));
      timeoutsArray.push(timeout);
    }

    setTimeouts(timeoutsArray);

    // Reset sortingInProgress after the sorting is complete
    setTimeout(() => {
      setSortingInProgress(false);
    }, delay * arraySteps.length);
  };

  // returns the bar width according to the arraysize
  // formula: width = 750/arraySize
  const getBarWidth = () => {
    return Math.floor(500 / arraySize);
  };

  // bars jsx object
  const bars = array.map((number, index) => {
    return (
      <Bar
        key={index}
        index={index}
        length={number}
        width={getBarWidth()}
        color={colorSteps[currentStep][index]}
      />
    );
  });

  const pause = () => {
    const pausedStep = currentStep;
    clearTimeouts();
    setCurrentStep(pausedStep);
    setArray(arraySteps[pausedStep]);
  };

  // When the document loads, initialize with new array
  useEffect(() => {
    initialize();
  }, [arraySize]);

  // when the array is done initializing, generate steps
  useEffect(() => {
    if (startGeneratingSteps) {
      generateSteps();
    }
  }, [startGeneratingSteps]);

  // when the algorithm changes, start generating steps again
  useEffect(() => {
    initialize_with_current_array();
  }, [algorithm]);

  /* const pauseSorting = () => {
    clearTimeouts();
    setSortingInProgress(false);
  };

  useEffect(() => {
    if (sortingInProgress) {
      pauseSorting();
    }
  }, [sortingInProgress]); */
  /* const resetSorting = () => {
    clearTimeouts();
    setArray(generateRandomArray());
    setArraySteps([array]);
    setCurrentStep(0);
    setSortingInProgress(false);
  }; */

  return (
    <div className="App">
      <Navbar
        startSorting={startSorting}
        // resetSorting={resetSorting}
        // pauseSorting={pauseSorting}
        currentStep={currentStep}
        generateNewArray={initialize}
        handleArraySizeAndSpeedChange={handleArraySizeAndSpeedChange}
        arraySize={arraySize}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        setStartGeneratingSteps={setStartGeneratingSteps}
      />
      <div className="array-display">{bars}</div>
      <Footer />
    </div>
  );
};

export default App;
