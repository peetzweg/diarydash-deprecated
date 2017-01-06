import React from "react";
import ReactDOM from "react-dom";

class DiaryDash extends React.Component {
	render() {
		return (
			<div>
				<h1>diarydash</h1>
			</div>
		);
	}
}

ReactDOM.render(
	<DiaryDash/>,
	document.getElementById("app")
);