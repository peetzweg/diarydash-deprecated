import React, {
	Component,
	PropTypes,
} from 'react';

class Container extends Component {
	render() {
		const style={
			width:'95vw',
			maxWidth:"960px",
		};
		return (
			<div style={style}>
				{this.props.children}
			</div>
		);
	}
}

Container.propTypes = {};
Container.defaultProps = {};

export default Container;
