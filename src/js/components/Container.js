import React, {
	Component,
	PropTypes,
} from "react";
import Measure from 'react-measure';

class Container extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fontSize: 12
		};
	}

	getChildContext() {
		return {fontSize: this.state.fontSize};
	}

	render() {
		// Keep your line length between 45 and 75 characters (66 is ideal)
		const {fontSize} = this.state;
		const style = {
			fontSize: fontSize + "px",
			width: "100vw",
			margin: "0.5em",
			maxWidth: "960px",
		};
		return (
			<Measure
				onMeasure={(dimensions) => {
          			this.setState({fontSize:Math.ceil((dimensions.width / 66) * 1.95)})
        		}}
			>
				<div style={Object.assign({},this.props.style, style)}>
					{this.props.children}
				</div>
			</Measure>
		);
	}
}

Container.propTypes = {};
Container.defaultProps = {
	style:{}
};
Container.childContextTypes = {
	fontSize: React.PropTypes.number,
};

export default Container;
