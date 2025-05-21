import {
	collection,
	query,
	where,
	getDocs,
	doc,
	getDoc,
} from "firebase/firestore";
import { db } from "../../../server/firebaseConfig";

export const getUserRoles = async (
	ay_id = null,
	setState,
	setLoading,
	triggerAlert
) => {
	try {
		setLoading(true);

		const members = {
			"Organization Lead": [],
			"Executive Board": [],
			"Core Lead": [],
			"Operations Department": [],
			"Finance Department": [],
			"Technology Department": [],
		};

		const roleRef = collection(db, "role");
		const ayDocRef = doc(db, "academicyear", ay_id);
		const q = query(
			roleRef,
			where("ro_ayID", "==", ayDocRef),
			where("ro_status", "==", "Active")
		);

		const snapshot = await getDocs(q);
		if (snapshot.empty) {
			setState(members);
			return members;
		}

		const roles = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));

		const userRoles = await mergeRoles(roles);

		const enrichedRoles = await Promise.all(
			userRoles.map(async (us) => {
				const userDetails = await getUserDetails(us.ro_usID.id);
				return {
					...us,
					user: userDetails,
				};
			})
		);

		enrichedRoles.forEach((role) => {
			const type = role.ro_type;
			if (members[type]) {
				members[type].push(role);
			}
		});

		setState(members);
		return members;
	} catch (error) {
		triggerAlert("danger", error.message);
		return {};
	} finally {
		setLoading(false);
	}
};

export const getUserDetails = async (userId) => {
	try {
		if (!userId) {
			throw new Error("No userId provided");
		}

		const userRef = doc(db, "users", userId);
		const snapshot = await getDoc(userRef);

		if (!snapshot.exists()) {
			console.log("getUserDetails → User not found");
			return null;
		}

		const userData = { id: snapshot.id, ...snapshot.data() };
		return userData;
	} catch (error) {
		triggerAlert("danger", error.message);
		return null;
	}
};

export const mergeRoles = (roles = []) => {
	if (!roles.length) return [];

	const grouped = {};

	roles.forEach((role) => {
		const userId = role.ro_usID?.id || "unknown";
		const roleType = role.ro_type || "unknown";
		const key = `${userId}_${roleType}`;

		if (!grouped[key]) {
			grouped[key] = {
				ref: role.ro_usID,
				ro_type: roleType,
				roles: [],
			};
		}
		grouped[key].roles.push(role);
	});

	const merged = Object.values(grouped).map(({ ref, ro_type, roles }) => {
		const ro_name = roles.map((r) => r.ro_name).join(", ");
		const uniqueYears = [...new Set(roles.map((r) => r.ro_acadyear || "N/A"))];

		return {
			ro_usID: ref,
			ro_name,
			ro_type,
			ro_acadyear: uniqueYears.join(", "),
		};
	});

	return merged;
};
