import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../index.css";

class Filemanager extends React.Component {
	render() {
		return (
			<Container className={this.props.className}>
				<Row lg="6">
					<Col className={styles.Col}>
						<FontAwesomeIcon
							icon={faFolder}
						/>
						<br /> sassa
					</Col>
					<Col className={styles.Col}>
						<FontAwesomeIcon
							icon={faFolder}
						/>
						<br />
						lol
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Filemanager;
