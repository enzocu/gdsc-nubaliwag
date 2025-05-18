import {
	collection,
	addDoc,
	doc,
	serverTimestamp,
	Timestamp,
} from "firebase/firestore";
import { db } from "../../../server/firebaseConfig";

export const insertPhoto = async (photo, triggerAlert, setBtnloading) => {
	try {
		setBtnloading(true);

		const photoData = {
			ph_ayID: doc(db, "academicyear", photo.ph_ayID),
			ph_status: "Active",
			ph_name: photo.ph_name?.trim() || "",
			ph_type: "Chapter",
			ph_date: Timestamp.fromDate(new Date(photo.ph_date)),
			ph_photoURL: photo.ph_photoURL || null,
			ph_create_timestamp: serverTimestamp(),
		};

		const docRef = await addDoc(collection(db, "photos"), photoData);

		triggerAlert("success", "Photo inserted successfully!");
		return docRef.id;
	} catch (error) {
		triggerAlert("danger", "Error inserting photo: " + error.message);
		throw error;
	} finally {
		setBtnloading(false);
	}
};
