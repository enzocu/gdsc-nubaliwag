import {
	collection,
	query,
	where,
	getDocs,
	doc,
	limit as limitFn,
	orderBy,
} from "firebase/firestore";
import { db } from "../../../server/firebaseConfig";

export const getUsers = async (
	ay_id = null,
	us_type = null,
	search = null,
	setMember,
	setLoading,
	triggerAlert,
	limit = 100
) => {
	try {
		setLoading(true);
		const userRef = collection(db, "users");
		const conditions = [];

		if (ay_id) {
			const ayDocRef = doc(db, "academicyear", ay_id);
			conditions.push(where("us_ayID", "==", ayDocRef));
		}

		if (us_type) conditions.push(where("us_type", "==", us_type));

		let q = query(
			userRef,
			...conditions,
			orderBy("us_create_timestamp", "desc"),
			limitFn(limit)
		);

		const snapshot = await getDocs(q);
		if (snapshot.empty) {
			setMember([]);
			return [];
		}

		const users = [];
		for (const docSnap of snapshot.docs) {
			const userData = { id: docSnap.id, ...docSnap.data() };

			if (userData.us_type === "Super Admin") continue;

			if (search) {
				const searchLower = search.toLowerCase().replace(/\s+/g, " ").trim();

				const fullName = `${userData.us_fname || ""} ${
					userData.us_mname || ""
				} ${userData.us_lname || ""}`
					.toLowerCase()
					.replace(/\s+/g, " ")
					.trim();

				const matchesSearch =
					fullName.includes(searchLower) ||
					userData.us_studentID?.toLowerCase().includes(searchLower);

				if (!matchesSearch) continue;
			}

			const userDocRef = doc(db, "users", docSnap.id);
			let roles = await getUserRolesByAY(userDocRef, userData.us_ayID);
			roles = mergeRoles(roles);

			users.push({ ...userData, roles });

			if (limit !== null && users.length >= limit) break;
		}

		setMember(users);

		return users;
	} catch (error) {
		triggerAlert("danger", "Error fetching users: " + error.message);

		setMember([]);
		return [];
	} finally {
		setLoading(false);
	}
};

export const getUserRolesByAY = async (userRef, ay_id = null) => {
	try {
		const roleRef = collection(db, "role");
		const conditions = [
			where("ro_usID", "==", userRef),
			where("ro_status", "==", "Active"),
		];
		if (ay_id) {
			conditions.push(where("ro_ayID", "==", ay_id));
		}

		const q = query(roleRef, ...conditions);
		const snapshot = await getDocs(q);

		if (snapshot.empty) return [];

		return snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
	} catch (error) {
		triggerAlert("danger", "Error fetching roles: " + error.message);
		return [];
	}
};

export const mergeRoles = (roles = []) => {
	if (!roles.length)
		return {
			ro_name: "N/A",
			ro_type: "N/A",
			ro_acadyear: "N/A",
		};

	const ro_name = roles.map((role) => role.ro_name).join(", ");

	const uniqueTypes = [...new Set(roles.map((role) => role.ro_type || "N/A"))];
	const uniqueYears = [
		...new Set(roles.map((role) => role.ro_acadyear || "N/A")),
	];

	return {
		ro_name,
		ro_type: uniqueTypes.join(", "),
		ro_acadyear: uniqueYears.join(", "),
	};
};
