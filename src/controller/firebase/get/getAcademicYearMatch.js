import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../server/firebaseConfig";

export async function getAcademicYearMatch(
	ay_id,
	setLoading,
	triggerAlert,
	navigate
) {
	try {
		setLoading(true);

		const docSnap = await getDoc(ay_id);

		if (!docSnap.exists()) {
			triggerAlert("warning", "Academic year not found.");
			return false;
		}

		const ay_academicyear = docSnap.data().ay_academicyear;

		const currentYear = new Date().getFullYear();
		const expectedAY = `${currentYear}-${currentYear + 1}`;

		if (ay_academicyear === expectedAY) {
			triggerAlert(
				"danger",
				`Cannot add new academic year because the current academic year (${ay_academicyear}) matches the expected year (${expectedAY}).`
			);
			return true;
		} else {
			navigate("/gdsc-nubaliwag/admin/dashboard/dashboardform?action=add");
		}
	} catch (error) {
		triggerAlert("danger", "Error checking academic year: " + error.message);
		return false;
	} finally {
		setLoading(false);
	}
}
