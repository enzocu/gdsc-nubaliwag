import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../server/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Lottie from "lottie-react";
import authAnimation from "../../assets/authLoading.json";
import { useAlert } from "./alertProvider";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [userDetails, setUserDetails] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const { triggerAlert } = useAlert();

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
						navigate("/");
					}
				} catch (error) {
					setUserDetails({});
					triggerAlert(
						"danger",
						error.message || "An error occurred. Please try again."
					);
					navigate("/admin/dashboard");
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
					<Lottie animationData={authAnimation} loop={true} />
				</div>
			) : (
				children
			)}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);
