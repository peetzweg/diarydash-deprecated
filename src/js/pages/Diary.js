import React, {
	Component,
	PropTypes,
} from 'react';

import moment from 'moment';

import Container from '../components/Container'
import Title from '../components/Title'
import DDEditor from '../components/DDEditor'

class Diary extends Component {
	render() {
		const style = {
			display: "flex",
			justifyContent: "center",
		};

		return (
			<div style={style}>
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
