import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/index.css";
import "./style/bootstrapStyle/bootstrap.css";
import App from "./view/App";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>
);
