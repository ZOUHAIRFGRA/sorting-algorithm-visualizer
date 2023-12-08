import "./Bar.css";
import Colors from "../colors/Colors";

const Bar = (props) => {
	const barStyle = {
		height: `${props.length * 0.65}vh`,
		backgroundColor: Colors[props.color],
		width: `${props.width}px`,
	};
	return (
		<>
			<div className="bar" style={barStyle}>
				{props.width >= 25 ? props.length : ""}
			</div>
		</>
	);
};

export default Bar;
