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
				alignItems: "flex-start",
				fontWeight: 700,
				paddingBottom: this.context.fontSize * 1.2 + "px",
				paddingLeft: "0.5em",
				fontFamily: "Playfair Display, serif",
				// fontFamily: 'Fira Sans, sans-serif',
				borderBottomStyle: "solid",
				borderBottomWidth: "1px",
				borderBottomColor: "#eeeeee",
			},
			date: {
				// color:'white',
				// backgroundColor:"#424242",
				fontSize: "3.5em",
				lineHeight: "0.4",
				marginRight: "0.1em",
			},
			details: {
				fontSize: "1.5em",
				lineHeight: "0.9",
				mozFontFeatureSettings: "c2sc, smcp",
				msFontFeatureSettings: "c2sc, smcp",
				webkitFontFeatureSettings: "c2sc, smcp",
				fontFeatureSettings: "c2sc, smcp",
				letterSpacing: "0.05em",
			}
		};
		return (
			<div style={styles.container}>
				<div style={styles.date}>{date.format("DD")}</div>
				<div
					style={styles.details}>{date.format("ddd").toUpperCase()}<br/>{date.format("MMM").toUpperCase()}
				</div>
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

Title.contextTypes = {
	fontSize: React.PropTypes.number
};
export default Title;
