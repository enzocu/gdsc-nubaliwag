import { doc, updateDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "../../../server/firebaseConfig";

export const updatePhoto = async (
	photoId,
	photo,
	triggerAlert,
	setBtnloading
) => {
	try {
		setBtnloading(true);

		const photoRef = doc(db, "photos", photoId);

		const updatedData = {
			ph_ayID: doc(db, "academicyear", photo.ph_ayID),
			ph_name: photo.ph_name?.trim() || "",
			ph_type: "Chapter",
			ph_photoURL: photo.ph_photoURL || null,
			ph_status: photo.ph_status || "Active",
			ph_date: Timestamp.fromDate(new Date(photo.ph_date)),
			ph_update_timestamp: serverTimestamp(),
		};

		await updateDoc(photoRef, updatedData);

		triggerAlert("success", "Photo updated successfully!");
	} catch (error) {
		triggerAlert("danger", "Error updating photo: " + error.message);
		throw error;
	} finally {
		setBtnloading(false);
	}
};
