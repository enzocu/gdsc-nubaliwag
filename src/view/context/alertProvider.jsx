import React, { createContext, useContext, useState, useEffect } from "react";

const AlertContext = createContext();
export const useAlert = () => useContext(AlertContext);

const TopAlertProvider = ({ children }) => {
	const [alert, setAlert] = useState({ type: "", message: "" });
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (show) {
			const timer = setTimeout(() => setShow(false), 4000);
			return () => clearTimeout(timer);
		}
	}, [show]);

	const triggerAlert = (type, message) => {
		setAlert({ type, message });
		setShow(true);
	};

	return (
		<AlertContext.Provider value={{ triggerAlert }}>
			{show && (
				<div
					className={`alert alert-${alert.type} alert-dismissible fade show fixed-top `}
					role="alert"
				>
					{alert.message}
					<button
						type="button"
						className="btn-close"
						onClick={() => setShow(false)}
					></button>
				</div>
			)}
			{children}
		</AlertContext.Provider>
	);
};

export default TopAlertProvider;
