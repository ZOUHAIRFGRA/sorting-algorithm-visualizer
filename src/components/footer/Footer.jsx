import { React } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";

import "./Footer.css";

const Footer = (props) => {
	return (
		<div id="footer">
			<div>
				Made with <FavoriteIcon fontSize="small" color="danger" /> by{" "}
				<a href="https://zouhairfgra.me">Zouhair Fouiguira</a> using <a href="http://react.dev">React.js</a> and 
				<a href="https://mui.com/">Material UI</a>
			</div>
		</div>
	);
};

export default Footer;
