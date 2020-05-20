import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
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

	update(path = "", isFolder = "true", mime) {
		if (isFolder === "true") {
			fetch(
				window.location.origin +
					"/api/dircontents?path=" +
					path
			)
				.then(data => data.json())
				.then(data => {
					this.grid = [];

					data["folders"].forEach(v => {
						let x = v;
						if (x.length > 29) {
							x =
								x.substring(
									0,
									32
								) + "..";
						}
						this.grid.push(
							<CustomCol
								action={
									this
										.action
								}
								key={v}
								className={
									styles.Col
								}
								loc={
									path +
									"/" +
									v
								}
								isFolder="true"
								mime=""
							>
								{x}
							</CustomCol>
						);
					});

					for (
						let i = 0;
						i < data["files"].length;
						i++
					) {
						let v = data["files"][i];
						let x = v;
						if (x.length > 29) {
							x =
								x.substring(
									0,
									32
								) + "..";
						}
						this.grid.push(
							<CustomCol
								action={
									this
										.action
								}
								key={v}
								className={
									styles.Col
								}
								loc={
									path +
									"/" +
									v
								}
								isFolder="false"
								mime={
									data[
										"mimes"
									][i]
								}
							>
								{x}
							</CustomCol>
						);
					}

					this.grid = (
						<Row xs={2} lg={6}>
							{this.grid}
						</Row>
					);

					this.forceUpdate();
				});
		} else {
			if (mime.startsWith("video")) {
				this.grid = (
					<video controls>
						<source
							src={
								"static/files/" +
								path
							}
						></source>
					</video>
				);

				this.forceUpdate();
			}
		}
	}

	action(f, isFolder, mime) {
		this.update(f, isFolder, mime);
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
