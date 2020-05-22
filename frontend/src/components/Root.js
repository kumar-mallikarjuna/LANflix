import React from "react";
import ReactDOM from "react-dom";
import Filemanager from "./Filemanager";
import "../index.css";

class Root extends React.Component {
	constructor(props) {
		super(props);
		this.filemanager = React.createRef();
	}

	componentDidMount() {
		ReactDOM.findDOMNode(this).focus();
	}

	componentDidUpdate() {
		ReactDOM.findDOMNode(this).focus();
	}

	render() {
		return (
			<div
				className={this.props.className}
				tabIndex="0"
				onKeyDown={e =>
					this.filemanager.current.navigate(e)
				}
			>
				<header className="Header">
					<img
						src="images/logo.png"
						className="Logo"
						alt="LANflix"
					/>
				</header>
				<Filemanager
					className="Filemanager"
					ref={this.filemanager}
				/>
			</div>
		);
	}
}

export default Root;
