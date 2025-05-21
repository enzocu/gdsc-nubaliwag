import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../../server/firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";

import Lottie from "lottie-react";
import loadingAcadYear from "../../assets/googleLoading.json";

const AcadYearContext = createContext();

export const AcadYearProvider = ({ children }) => {
	const [acadYear, setAcadYear] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const academicYearRef = collection(db, "academicyear");
		const q = query(academicYearRef, where("ay_status", "==", "Active"));

		const unsubscribe = onSnapshot(
			q,
			(snapshot) => {
				if (!snapshot.empty) {
					const docData = snapshot.docs[0].data();
					const docId = snapshot.docs[0].id;
					setAcadYear({ id: docId, ...docData });
				} else {
					setAcadYear(null);
				}
				setLoading(false);
			},
			(error) => {
				console.error("Error getting realtime academic year:", error);
				setLoading(false);
			}
		);

		return () => unsubscribe();
	}, []);

	return (
		<AcadYearContext.Provider value={{ acadYear, loading }}>
			{loading ? (
				<div className="authloading-container">
					<Lottie
						animationData={loadingAcadYear}
						loop={true}
						className="auth"
					/>
				</div>
			) : (
				children
			)}
		</AcadYearContext.Provider>
	);
};

export const useAcadYear = () => useContext(AcadYearContext);
