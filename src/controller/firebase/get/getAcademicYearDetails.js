import { onSnapshot } from "firebase/firestore";
import { db } from "../../../server/firebaseConfig";

export function getAcademicYearDetails(
	ay_id,
	setAcadyear,
	setLoading,
	triggerAlert
) {
	setLoading(true);

	const unsubscribe = onSnapshot(
		ay_id,
		(snap) => {
			if (!snap.exists()) {
				triggerAlert("warning", "Academic year not found.");
				setLoading(false);
				return;
			}

			const data = snap.data();

			setAcadyear({
				id: snap.id,
				ay_bannerURL: data.ay_bannerURL || "",
				ay_academicyear: data.ay_academicyear || "",
				ay_about: data.ay_about || "",
				ay_photoURL: data.ay_photoURL || "",
			});

			setLoading(false);
		},
		(error) => {
			triggerAlert("danger", "Error fetching academic year: " + error.message);
			setLoading(false);
		}
	);

	return unsubscribe;
}
