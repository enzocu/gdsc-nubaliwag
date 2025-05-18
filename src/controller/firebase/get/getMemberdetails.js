import {
	doc,
	onSnapshot,
	collection,
	query,
	where,
	onSnapshot as onRoleSnapshot,
} from "firebase/firestore";
import { db } from "../../../server/firebaseConfig";

export const getMemberdetails = (
	userId,
	triggerAlert,
	setLoading,
	setUser,
	setRole
) => {
	try {
		setLoading(true);

		let userLoaded = false;
		let rolesLoaded = false;

		const userRef = doc(db, "users", userId);
		const unsubUser = onSnapshot(userRef, (docSnap) => {
			if (docSnap.exists()) {
				const data = docSnap.data();
				setUser({
					me_ayID: data.us_ayID || "",
					me_fname: data.us_fname || "",
					me_mname: data.us_mname || "",
					me_lname: data.us_lname || "",
					me_suffix: data.us_suffix || "",
					me_studentID: data.us_studentID || "",
					me_email: data.us_email || "",
					me_photoURL: data.us_photoURL || null,
				});
			} else {
				triggerAlert("warning", "User not found.");
			}
			userLoaded = true;

			if (userLoaded && rolesLoaded) {
				setLoading(false);
			}
		});

		const roleQuery = query(
			collection(db, "role"),
			where("ro_usID", "==", userRef),
			where("ro_status", "==", "Active")
		);

		const unsubRole = onRoleSnapshot(roleQuery, (querySnap) => {
			const roles = querySnap.docs.map((doc) => {
				const data = doc.data();
				return {
					ro_id: doc.id,
					ro_ayID: data.ro_ayID?.id || "",
					ro_status: data.ro_status || "",
					ro_name: data.ro_name || "",
					ro_acadyear: data.ro_acadyear || "",
					ro_type: data.ro_type || "",
				};
			});
			setRole(roles);
			rolesLoaded = true;

			if (userLoaded && rolesLoaded) {
				setLoading(false);
			}
		});

		return () => {
			unsubUser();
			unsubRole();
		};
	} catch (error) {
		triggerAlert(
			"danger",
			"Error setting up real-time listeners: " + error.message
		);
		setLoading(false);
	}
};
