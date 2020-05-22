import React from "react";
import Root from "./components/Root";
import { render } from "react-dom";
import "./index.css";

const root = document.getElementById("wrapper");

render(<Root className="Root" />, root);
