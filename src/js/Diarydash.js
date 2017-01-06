import ReactDOM from 'react-dom';
import React, {
	Component,
	PropTypes,
} from 'react';

import Diary from './pages/Diary'

class Diarydash extends Component {

	componentDidMount() {
		// document.body.style.backgroundColor = "black";
		// document.body.style.filter = "brightness(50%)";
	}

	render() {
		const style = {
			fontFamily: 'Libre Baskerville, serif',
			color: "#424242",
			textRendering: 'optimizeLegibility',
			fontSize: "24px", // Keep your line length between 45 and 75 characters (66 is ideal)
		};


		return (
			<div style={style}>
				<Diary/>
			</div>
		);
	}
}
export default Diarydash;

ReactDOM.render(
	<Diarydash/>,
	document.getElementById("app")
);