import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import CustomCol from "./CustomCol.js";
import "../index.css";
import { Player, ControlBar } from "video-react";

class Filemanager extends React.Component {
	constructor(props) {
		super(props);
		this.currDir = "";
		this.painting = [];
		this.grid = [];
		this.action = this.action.bind(this);
		this.update = this.update.bind(this);
		this.colMax = 0;
		this.rowMax = 0;
		this.x = 0;
		this.y = 0;
		this.mediaPlayer = React.createRef();

		let w = window.innerWidth;
		if (w < 768) {
			this.colMax = 2;
		} else if (w >= 768 && w < 1200) {
			this.colMax = 4;
		} else {
			this.colMax = 6;
		}
	}

	navigate(e) {
		if (this.mediaPlayer == null) {
			if (e.key === "8") {
				this.grid[this.x][this.y].current.select(false);
				this.x = (this.x + 1) % this.rowMax;
				this.y = this.y % this.grid[this.x].length;
				this.grid[this.x][this.y].current.select(true);
			} else if (e.key === "6") {
				this.grid[this.x][this.y].current.select(false);
				this.y =
					(this.y + 1) % this.grid[this.x].length;
				this.grid[this.x][this.y].current.select(true);
			} else if (e.key === "2") {
				this.grid[this.x][this.y].current.select(false);
				this.x =
					(((this.x - 1) % this.rowMax) +
						this.rowMax) %
					this.rowMax;
				this.grid[this.x][this.y].current.select(true);
			} else if (e.key === "4") {
				this.grid[this.x][this.y].current.select(false);
				this.y =
					(((this.y - 1) %
						this.grid[this.x].length) +
						this.grid[this.x].length) %
					this.grid[this.x].length;
				this.grid[this.x][this.y].current.select(true);
			} else if (e.key === "5") {
				this.grid[this.x][this.y].current.select(false);
				let ele = this.grid[this.x][this.y].current;
				this.action(
					ele.props.loc,
					ele.props.isFolder,
					ele.props.mime
				);
			}
		} else if (e.key === "MediaPlay") {
			if (this.mediaPlayer != null) {
				this.mediaPlayer.current.play();
			}
		} else if (e.key === "Pause") {
			if (this.mediaPlayer != null) {
				this.mediaPlayer.current.pause();
			}
		} else if (e.key === "MediaFastForward") {
			if (this.mediaPlayer != null) {
				this.mediaPlayer.current.forward(5);
			}
		} else if (e.key === "MediaRewind") {
			if (this.mediaPlayer != null) {
				this.mediaPlayer.current.replay(5);
			}
		} else if (e.key === "ColorF0Red") {
			if (this.mediaPlayer != null) {
				this.mediaPlayer.current.toggleFullscreen();
			}
		}
	}

	update(path = "", isFolder = "true", mime) {
		if (isFolder === "true") {
			fetch(
				"http://192.168.1.6:8000" +
					"/api/dircontents?path=" +
					path
			)
				.then(data => data.json())
				.then(data => {
					const rowMax = Math.ceil(
						(data["folders"].length +
							data["files"].length) /
							this.colMax
					);

					this.rowMax = rowMax;

					this.x = 0;
					this.y = 0;

					this.mediaPlayer = null;

					this.painting = [];
					this.grid = new Array(rowMax);
					var lastRowSize =
						(data["folders"].length +
							data["files"].length) %
						this.colMax;

					if (lastRowSize === 0)
						lastRowSize = this.colMax;

					for (let i = 0; i < rowMax; i++) {
						this.grid[i] = new Array(
							i < rowMax - 1
								? this.colMax
								: lastRowSize
						);
						for (
							let j = 0;
							j < this.grid[i].length;
							j++
						) {
							this.grid[i][
								j
							] = React.createRef();
						}
					}

					var l = 0;
					var m = 0;
					var count = 0;

					data["folders"].forEach(v => {
						let x = v;
						if (x.length > 16) {
							x =
								x.substring(
									0,
									16
								) + "..";
						}

						l = Math.floor(
							count / this.colMax
						);
						m = Math.floor(
							count % this.colMax
						);

						this.painting.push(
							<CustomCol
								action={
									this
										.action
								}
								key={v}
								className="Col"
								loc={
									path +
									"/" +
									v
								}
								isFolder="true"
								mime=""
								ref={
									this
										.grid[
										l
									][m]
								}
							>
								{x}
							</CustomCol>
						);

						count++;
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

						l = Math.floor(
							count / this.colMax
						);
						m = Math.floor(
							count % this.colMax
						);

						this.painting.push(
							<CustomCol
								action={
									this
										.action
								}
								key={v}
								className="Col"
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
								ref={
									this
										.grid[
										l
									][m]
								}
							>
								{x}
							</CustomCol>
						);

						count++;
					}

					this.painting = (
						<Row xs={2} md={4} lg={6}>
							{this.painting}
						</Row>
					);

					this.forceUpdate();
					this.grid[this.x][
						this.y
					].current.select(true);
				});
		} else {
			if (mime.startsWith("video")) {
				this.mediaPlayer = React.createRef();

				fetch(
					"http://192.168.1.6:8000" +
						"/api/subs?path=" +
						path
				)
					.then(data => data.json())
					.then(data => {
						this.painting = (
							<div>
								<link
									rel="stylesheet"
									href="https://video-react.github.io/assets/video-react.css"
								/>
								<Player
									width="1024px"
									height="576px"
									ref={
										this
											.mediaPlayer
									}
									className="PlayerCustoms"
								>
									<source
										src={
											"files/" +
											path
										}
									/>
									<track
										label="Default"
										kind="subtitles"
										src={
											"files/" +
											data[
												"sub"
											]
										}
										default
									/>
									<ControlBar
										autoHide={
											true
										}
									/>
								</Player>
							</div>
						);

						this.forceUpdate();
					});
			} else {
				this.mediaPlayer = null;
				return false;
			}
		}

		return false;
	}

	action(f, isFolder, mime) {
		return this.update(f, isFolder, mime);
	}

	componentDidMount() {
		this.update();
	}

	render() {
		return (
			<Container className={this.props.className} fluid>
				{this.painting}
			</Container>
		);
	}
}

export default Filemanager;
