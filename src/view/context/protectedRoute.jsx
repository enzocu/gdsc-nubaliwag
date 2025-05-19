import React, { useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../context/userContext";

const ProtectedRoute = ({ children }) => {
	const { user, loading } = useUser();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (!loading && user && location.pathname === "/") {
			navigate("/gdsc-nubaliwag/admin/dashboard", { replace: true });
		}
	}, [user, loading, navigate, location]);

	const publicPaths = [
		"/gdsc-nubaliwag/user/coreteam",
		"/gdsc-nubaliwag/user/events",
		"/gdsc-nubaliwag/user/projects",
		"/gdsc-nubaliwag/user/contact",

		"/gdsc-nubaliwag/user/events/eventsdetails",
	];

	if (!user && !loading && !publicPaths.includes(location.pathname)) {
		return <Navigate to="/gdsc-nubaliwag/" replace />;
	}

	return children;
};

export default ProtectedRoute;
