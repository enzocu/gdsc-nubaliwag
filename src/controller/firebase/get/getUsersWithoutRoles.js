import {
	collection,
	query,
	where,
	orderBy,
	limit as limitFn,
	getDocs,
} from "firebase/firestore";
import { db } from "../../../server/firebaseConfig";

export const getUsersWithoutRoles = async (
	ay_id,
	limit = 20,
	setMember,
	setLoading,
	triggerAlert
) => {
	try {
		setLoading(true);

		const userRef = collection(db, "users");
		const conditions = [where("us_ayID", "==", ay_id)];
		let q = query(
			userRef,
			...conditions,
			orderBy("us_create_timestamp", "desc"),
			limitFn(limit)
		);

		const snapshot = await getDocs(q);

		if (snapshot.empty) {
			return [];
		}

		const users = snapshot.docs
			.map((docSnap) => {
				const userData = { id: docSnap.id, ...docSnap.data() };
				if (userData.us_type === "Super Admin") return null;
				return userData;
			})
			.filter(Boolean);
		setMember(users);
		return users;
	} catch (error) {
		triggerAlert("danger", "Error fetching users: " + error.message);
		return [];
	} finally {
		setLoading(false);
	}
};
