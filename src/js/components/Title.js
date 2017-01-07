import React, {
	Component,
	PropTypes,
} from "react";

import moment from "moment";

class Title extends Component {
	render() {
		const {date} = this.props;

		const styles = {
			container: {
				display: "flex",
				fontWeight: 700,
				fontSize: "1.5em",
				lineHeight: "1.10",
				paddingBottom: "1em",
				fontFamily: "Playfair Display, serif",
				borderBottomStyle: "solid",
				borderBottomWidth: "1px",
				borderBottomColor: "#424242",
			},
			date: {
				fontSize: "2em",
				marginRight: "0.2em",
			},
			details: {}
		};
		return (
			<div style={styles.container}>
				<div style={styles.date}>{date.format("Do")}</div>
				<div>{date.format("dddd")}<br/>{date.format("MMMM, YYYY")}</div>
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
