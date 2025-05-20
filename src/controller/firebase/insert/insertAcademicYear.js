import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../server/firebaseConfig";

export async function insertAcademicYear(
	ay_id,
	us_id,
	acadyear,
	setBtnLoading,
	triggerAlert
) {
	try {
		setBtnLoading(true);

		const newDocRef = await addDoc(collection(db, "academicyear"), {
			...acadyear,
			ay_create_timestamp: new Date(),
			ay_status: "active",
		});

		await updateDoc(ay_id, {
			ay_status: "Inactive",
		});

		const userRef = doc(db, "users", us_id);
		await updateDoc(userRef, {
			us_ayID: newDocRef,
		});

		triggerAlert("success", "Academic year added successfully.");
	} catch (error) {
		triggerAlert("danger", "Error adding academic year: " + error.message);
	} finally {
		setBtnLoading(false);
	}
}
