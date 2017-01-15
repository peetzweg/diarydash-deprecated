import React, {
	Component,
	PropTypes,
} from 'react';

import DBActions from "../db/DBActions";

class Menu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			lastScroll: 0,
			amount:"n/a",
			isChrome: navigator.userAgent.toLowerCase().includes("chrome"),
		};
	}

	componentDidMount() {
		DBActions.on("amount",amount=>this.setState({amount:amount}));
		DBActions.getAmountOfEntries();
		window.scrollBy(0, 1);
		if (this.state.isChrome) {
			window.addEventListener('scroll', this.toggle);
		} else {
			window.addEventListener('scroll', this.toggleSafari);
		}
	}

	toggleSafari = (event)=> {
		if (window.scrollY <= 0 && this.state.lastScroll < 0) {
			this.setState({
				open: true,
			});
		} else {
			this.setState({
				open: false,
			});
		}
		this.setState({
			lastScroll: window.scrollY,
		})
	};

	toggle = (event) => {
		if (window.scrollY == 0) {
			this.setState({
				open: true,
			});
		} else {
			this.setState({
				open: false,
			});
		}
	};


	render() {
		const {open} = this.state;
		const style = {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			width: "100%",
			color: "#ffffff",
			backgroundColor: "#424242",
			overflow: "hidden",
			height: open ? "56px" : "2px",
			transition: open ? "height 0.15s ease-out" : "height 0.15s cubic-bezier(0.42, 0.0, 1.0, 1.0)",
		};
		return (
			<div style={style}>
				{!open ? null :
					<div>
						{this.state.amount}
					</div>
				}
			</div>
		);
	}
}

Menu.propTypes = {};
Menu.defaultProps = {};

export default Menu;
