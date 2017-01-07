import React, {
	Component,
	PropTypes,
} from "react";
import Measure from 'react-measure';

class Container extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dimensions: {
				width: -1,
				height: -1
			}
		};
	}

	render() {
		// Keep your line length between 45 and 75 characters (66 is ideal)
		const fontSize = Math.ceil((this.state.dimensions.width / 66) * 1.6);
		console.log('fontSize', fontSize);
		const style = {
			fontSize: fontSize + "px",
			width: "100vw",
			margin: "0.5em",
			maxWidth: "960px",
		};

		return (
			<Measure
				onMeasure={(dimensions) => {
          			this.setState({dimensions})
        		}}
			>
				<div style={style}>
					{this.props.children}
				</div>
			</Measure>
		);
	}
}

Container.propTypes = {};
Container.defaultProps = {};

export default Container;
