import React, { useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../context/userContext";

const ProtectedRoute = ({ children }) => {
	const { user, loading } = useUser();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (!loading && user && location.pathname === "/") {
			navigate("/admin/dashboard", { replace: true });
		}
	}, [user, loading, navigate, location]);

	const publicPaths = [
		"/user/coreteam",
		"/user/events",
		"/user/projects",
		"/user/contact",
	];

	if (!user && !loading && !publicPaths.includes(location.pathname)) {
		return <Navigate to="/" replace />;
	}

	return children;
};

export default ProtectedRoute;
