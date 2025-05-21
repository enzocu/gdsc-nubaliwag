import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Lottie from "lottie-react";
import authAnimation from "../../assets/googleLoading.json";
import { useAlert } from "./alertProvider";

import { auth, db } from "../../server/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const { triggerAlert } = useAlert();

	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);
	const [userDetails, setUserDetails] = useState(null);

	const isAdminRoute = location.pathname.startsWith("/gdsc-nubaliwag/admin");

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			if (currentUser) {
				setUser(currentUser);
				try {
					const userRef = doc(db, "users", currentUser.uid);
					const docSnap = await getDoc(userRef);

					if (docSnap.exists()) {
						setUserDetails(docSnap.data());
					} else {
						setUserDetails({});
						navigate("/gdsc-nubaliwag/");
					}
					if (!isAdminRoute) {
						navigate("/gdsc-nubaliwag/admin/dashboard");
					}
				} catch (error) {
					setUserDetails({});
					triggerAlert(
						"danger",
						error.message || "An error occurred. Please try again."
					);
				}
			} else {
				setUser(null);
				setUserDetails(null);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, [navigate]);

	return (
		<UserContext.Provider value={{ user, userDetails, loading }}>
			{loading ? (
				<div className="authloading-container">
					<Lottie animationData={authAnimation} loop={true} className="auth" />
				</div>
			) : (
				children
			)}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);
