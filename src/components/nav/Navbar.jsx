import { React } from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { makeStyles } from "@mui/styles";

import "./Navbar.css";

const Navbar = (props) => {
  // starts playing the sorting algorithm
  const sortArrayHandler = () => {
    props.startSorting();
  };

  // generates a new random array
  const generateNewArrayHandler = () => {
    props.generateNewArray();
  };

  // lets the user change size of array and speed of sorting
  const handleArraySizeAndSpeedChange = (event, newValue) => {
    props.handleArraySizeAndSpeedChange(newValue);
  };

  // handle changing of algorithm
  const handleSortingAlgorithmChange = (event, newValue) => {
    console.log(`sorting algorithm changed to: ${newValue}`);
    props.setAlgorithm(newValue);
  };

  // custom CSS for MUI buttons
  const useStyles = makeStyles({
    button: {
      backgroundColor: "green",
      color: "#green",
      "&:hover": {
        color: "red",
      },
      "&:click": {
        color: "blue",
      },
    },
  });
  // const classes = useStyles();
  const pauseSortingHandler = () => {
    props.pauseSorting();
  };

  const resetSortingHandler = () => {
    props.resetSorting();
  };
  return (
    <div id="nav-bar">
      <div id="title">
        <h1>Sorting Algorithm Visualizer</h1>
      </div>
      <div id="toolbar">
        <div>
          <Typography gutterBottom>Array size & sorting speed</Typography>
          <Slider
            value={props.arraySize}
            min={5}
            step={5}
            max={100}
            onChange={handleArraySizeAndSpeedChange}
            valueLabelDisplay="auto"
            aria-labelledby="array size and sorting speed slider"
            id="non-linear-slider"
          />
        </div>
        {/* <Divider orientation="vertical" variant="fullWidth" light="True" /> */}
        <div className="separator" />

        <Button variant="text" color="info" onClick={generateNewArrayHandler}>
          Generate New Array
        </Button>

        <div className="separator" />
        <ToggleButtonGroup
          value={props.algorithm}
          exclusive
          onChange={handleSortingAlgorithmChange}
          aria-label="sorting algorithm"
        >
          <ToggleButton value="Insertion Sort" aria-label="Insertion Sort">
            Insertion Sort
          </ToggleButton>
          <ToggleButton value="Merge Sort" aria-label="Merge Sort">
            Merge Sort
          </ToggleButton>
          <ToggleButton value="Quick Sort" aria-label="Quick Sort">
            Quick Sort
          </ToggleButton>
          <ToggleButton value="Bubble Sort" aria-label="Bubble Sort">
            Bubble Sort
          </ToggleButton>
          <ToggleButton value="Heap Sort" aria-label="Heap Sort">
            Heap Sort
          </ToggleButton>
        </ToggleButtonGroup>
        <div className="separator" />

        <Button variant="text" color="secondary" onClick={sortArrayHandler}>
          Sort!
        </Button>
        {/* // TODO : fix pause btn : it trigger the sort function many times */}
        {/* <Button variant="text" color="primary" onClick={pauseSortingHandler}>
          Pause Sorting
        </Button>
 */}
        {/* // TODO :  fix reset bad  behavior   */}

        {/* New Button for resetting sorting */}
       {/*  <Button variant="text" color="primary" onClick={resetSortingHandler}>
          Reset Sorting
        </Button> */}
      </div>
    </div>
  );
};

export default Navbar;
