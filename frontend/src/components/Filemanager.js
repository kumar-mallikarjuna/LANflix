import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CustomCol from "./CustomCol.js";
import styles from "../index.css";

class Filemanager extends React.Component {
	constructor(props) {
		super(props);
		this.currDir = "";
		this.grid = [];
		this.action = this.action.bind(this);
		this.update = this.update.bind(this);
	}

	update(path = "") {
		fetch(window.location.origin + "/api/dircontents?path=" + path)
			.then(data => data.json())
			.then(data => {
				console.log(data);

				this.grid = [];

				data["folders"].forEach(v => {
					let x = v;
					if (x.length > 29) {
						x = x.substring(0, 32) + "..";
					}
					this.grid.push(
						<CustomCol
							action={this.action}
							key={v}
							className={styles.Col}
							loc={v}
							isFolder="true"
						>
							{x}
						</CustomCol>
					);
				});

				data["files"].forEach(v => {
					let x = v;
					if (x.length > 29) {
						x = x.substring(0, 32) + "..";
					}
					this.grid.push(
						<CustomCol
							changeDir={
								this.changeDir
							}
							key={v}
							className={styles.Col}
							loc={v}
						>
							{x}
						</CustomCol>
					);
				});

				this.grid = (
					<Row xs={2} lg={6}>
						{this.grid}
					</Row>
				);

				this.forceUpdate();
			});
	}

	action(dir) {
		this.currDir = this.currDir + "/" + dir;
		this.update(this.currDir);
	}

	componentDidMount() {
		this.update();
	}

	render() {
		return (
			<Container className={this.props.className} fluid>
				{this.grid}
			</Container>
		);
	}
}

export default Filemanager;
