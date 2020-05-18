import React from "react";

class Root extends React.Component {
	render() {
		console.log(this.props.className);
		return (
			<div className={this.props.className}>
				{this.props.children}
			</div>
		);
	}
}

export default Root;
