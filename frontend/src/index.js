import React from "react";
import Root from "./components/Root";
import { render } from "react-dom";
import styles from "./index.css";

const root = document.getElementById("wrapper");

render(
	<Root className={styles.Root}>
		<header className={styles.Header}>
			<img
				src="static/images/logo.png"
				className={styles.Logo}
			/>
		</header>

		<video control></video>
	</Root>,
	root
);
