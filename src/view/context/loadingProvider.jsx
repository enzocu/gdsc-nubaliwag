import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Lottie from "lottie-react";
import loadingAnimation from "../../assets/loading.json";
const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
	const location = useLocation();
	const [loading, setLoading] = useState(false);
	const [currentPath, setPath] = useState("");

	useEffect(() => {
		if (currentPath !== location.pathname) {
			setLoading(false);
		}
	}, [location.pathname, currentPath]);

	return (
		<LoadingContext.Provider value={{ loading, setLoading, setPath }}>
			<>
				{loading && (
					<div className="loading-container">
						<Lottie animationData={loadingAnimation} loop={true} />
					</div>
				)}
				{children}
			</>
		</LoadingContext.Provider>
	);
};
