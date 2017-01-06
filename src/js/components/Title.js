import React, {
	Component,
	PropTypes,
} from 'react';

import moment from 'moment';

class Title extends Component {
	render() {
		const {date} = this.props;

		const styles = {
			container: {
				fontWeight: 700,
				fontSize: "1.5em",
				lineHeight: "1.10",
				paddingBottom: "1em",
			},
			day: {},
			details: {}
		};
		return (
			<div style={styles.container}>
				<div>{date.format('dddd')},</div>
				<div>{date.format('MMMM Do, YYYY')}</div>
			</div>
		);
	}
}

Title.propTypes = {
	date: React.PropTypes.object.isRequired,
};
Title.defaultProps = {
	date: moment(),
};

export default Title;
