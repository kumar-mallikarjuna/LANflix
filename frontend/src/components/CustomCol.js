import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faFile } from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";
import styles from "../index.css";

class CustomCol extends React.Component {
	constructor(props) {
		super(props);
		console.log(this.props);
	}

	render() {
		if (this.props.isFolder === "true") {
			return (
				<Col
					className={styles.Col}
					onClick={() =>
						this.props.action(
							this.props.loc
						)
					}
				>
					<FontAwesomeIcon icon={faFolder} />
					<br />
					{this.props.children}
				</Col>
			);
		}
		return (
			<Col
				className={styles.Col}
				onClick={() =>
					this.props.changeDir(this.props.loc)
				}
			>
				<FontAwesomeIcon icon={faFile} />
				<br />
				{this.props.children}
			</Col>
		);
	}
}

export default CustomCol;
