import ReactDOM from "react-dom";
import React, {
	Component,
	PropTypes,
} from "react";

import Diary from "./pages/Diary";
import DBActions from "./db/DBActions";

class Diarydash extends Component {

	constructor(props) {
		super(props);
		this.state = {
			ready: false,
		}
	}

	componentWillMount() {
		DBActions.once("ready", ()=> {
			this.setState({ready: true});
		});

	}


	componentDidMount() {
		// document.body.style.backgroundColor = "black";
		// document.body.style.filter = "brightness(50%)";
	}

	render() {
		const {ready} = this.state;
		const style = {
			color: "#424242",
			textRendering: "optimizeLegibility",
			fontFamily: "Fira Sans, sans-serif",
		};
		return (
			<div style={style}>
				{ready ? <Diary/> : null}

			</div>
		);
	}
}
export default Diarydash;

ReactDOM.render(
	<Diarydash/>,
	document.getElementById("app")
);