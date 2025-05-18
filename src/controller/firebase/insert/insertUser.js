import { collection, addDoc, serverTimestamp, doc } from "firebase/firestore";
import { db } from "../../../server/firebaseConfig";

export const insertUser = async (
	ay_id,
	member,
	role,
	triggerAlert,

	setBtnloading
) => {
	try {
		setBtnloading(true);

		const userData = {
			us_status: "Active",
			us_ayID: ay_id,
			us_studentID: member.me_studentID || "",
			us_fname: member.me_fname || "",
			us_mname: member.me_mname || "",
			us_lname: member.me_lname || "",
			us_suffix: member.me_suffix || "",
			us_email: member.me_email || "",
			us_photoURL: member.me_photoURL || null,
			us_create_timestamp: serverTimestamp(),
		};

		const docRef = await addDoc(collection(db, "users"), userData);

		for (const ro of role) {
			const roleData = {
				ro_usID: docRef,
				ro_ayID: doc(db, "academicyear", ro.ro_ayID),
				ro_status: "Active",
				ro_name: ro.ro_name || "",
				ro_acadyear: ro.ro_acadyear,
				ro_type: ro.ro_type,
				ro_create_timestamp: serverTimestamp(),
			};
			await addDoc(collection(db, "role"), roleData);
		}

		triggerAlert("success", "User inserted successfully! ID: " + docRef.id);
		return docRef.id;
	} catch (error) {
		triggerAlert("danger", "Error inserting user: " + error.message);
		throw error;
	} finally {
		setBtnloading(false);
	}
};
