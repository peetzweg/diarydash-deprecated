import React, {
	Component,
	PropTypes,
} from 'react';

import moment from 'moment';

import Container from '../components/Container'
import DDEditor from '../components/DDEditor'
import Menu from '../components/Menu'
import Title from '../components/Title'


class Diary extends Component {
	render() {
		const style = {
			display: "flex",
			// justifyContent: "center",
			alignItems:"center",
			flexDirection: "column",
			overflowY: "scroll",
			minHeight:"101vh",
			height:"101%",
		};

		return (
			<div style={style}>
				{/*<Menu/>*/}
				<Container>
					<Title date={moment()}/>
					<DDEditor/>
				</Container>
			</div>
		);
	}
}

Diary.propTypes = {};
Diary.defaultProps = {};

export default Diary;
