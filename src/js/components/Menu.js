import React, {
	Component,
	PropTypes,
} from 'react';

class Menu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			lastScroll: 0,
			isChrome: navigator.userAgent.toLowerCase().includes("chrome"),
		};
	}

	componentDidMount() {
		window.scrollBy(0, 1);
		if(this.state.isChrome){
			window.addEventListener('scroll', this.toggle);
		}else{
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
			position: "relative",
			margin: 0,
			padding: 0,
			top: 0,
			width: "100%",
			color: "#ffffff",
			backgroundColor: "#424242",
			overflow: "hidden",
			height: open ? "56px" : "2px",
			transition: open ? "height 0.15s ease-out" : "height 0.15s cubic-bezier(0.42, 0.0, 1.0, 1.0)",
		};
		return (
			<div style={style}><span>MENU</span></div>
		);
	}
}

Menu.propTypes = {};
Menu.defaultProps = {};

export default Menu;
