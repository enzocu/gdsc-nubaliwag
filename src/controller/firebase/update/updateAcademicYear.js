import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../server/firebaseConfig";

export async function updateAcademicYear(
	ay_id,
	acadyear,
	setBtnLoading,
	triggerAlert
) {
	try {
		setBtnLoading(true);

		await updateDoc(ay_id, {
			...acadyear,
			ay_update_timestamp: new Date(),
		});

		triggerAlert("success", "Academic year updated successfully.");
	} catch (error) {
		triggerAlert("danger", "Error updating academic year: " + error.message);
	} finally {
		setBtnLoading(false);
	}
}
