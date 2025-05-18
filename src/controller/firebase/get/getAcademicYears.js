import { collection, getDocs, getDoc } from "firebase/firestore";
import { db } from "../../../server/firebaseConfig";

export const getAcademicYears = async (ay_id = null, setAcademicYear) => {
	try {
		if (ay_id) {
			const docSnap = await getDoc(ay_id);

			if (docSnap.exists()) {
				setAcademicYear([{ id: docSnap.id, ...docSnap.data() }]);
			} else {
				console.log("No academic year found.");
				setAcademicYear([]);
			}
		} else {
			const academicYearRef = collection(db, "academicyear");
			const snapshot = await getDocs(academicYearRef);

			if (snapshot.empty) {
				console.log("No academic year found.");
				setAcademicYear([]);
				return;
			}

			const data = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));

			const sorted = data.sort((a, b) => {
				const getStartYear = (val) =>
					parseInt(val.ay_academicyear?.split("-")[0], 10);
				return getStartYear(b) - getStartYear(a);
			});

			setAcademicYear(sorted);
		}
	} catch (error) {
		console.error("Error fetching academic years:", error);
		setAcademicYear([]);
	}
};
