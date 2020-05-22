import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faFile, faFilm } from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";
import "../index.css";

class CustomCol extends React.Component {
	constructor(props) {
		super(props);
		this.state = { class: "Col" };
	}

	select(hov) {
		if (hov)
			this.setState({
				class: "Colh Col"
			});
		else this.setState({ class: "Col" });
	}

	render() {
		let icon = faFile;
		if (this.props.isFolder === "true") {
			icon = faFolder;
		} else if (this.props.mime.startsWith("video")) {
			icon = faFilm;
		}

		return (
			<Col
				className={this.state.class}
				onClick={() =>
					this.props.action(
						this.props.loc,
						this.props.isFolder,
						this.props.mime
					)
				}
			>
				<FontAwesomeIcon icon={icon} />
				<br />
				{this.props.children}
			</Col>
		);
	}
}

export default CustomCol;
