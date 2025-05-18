import {
	collection,
	query,
	where,
	getCountFromServer,
	doc,
	getDocs,
} from "firebase/firestore";
import { db } from "../../../server/firebaseConfig";

export async function getActiveEventsCount(ay_id, setCount) {
	try {
		const eventsRef = collection(db, "events");
		const q = query(eventsRef, where("ev_ayID", "==", ay_id));

		const snapshot = await getCountFromServer(q);
		const count = snapshot.data().count;
		setCount((prev) => ({ ...prev, events: count }));
		return count;
	} catch (error) {
		console.error("Error counting events:", error);
		setCount((prev) => ({ ...prev, events: 0 }));
		return 0;
	}
}

export async function getActivePhotosCount(ay_id, setCount) {
	try {
		const photosRef = collection(db, "photos");
		const q = query(
			photosRef,
			where("ph_ayID", "==", ay_id),
			where("ph_status", "==", "Active"),
			where("ph_type", "==", "Chapter")
		);

		const snapshot = await getCountFromServer(q);
		const count = snapshot.data().count;
		setCount((prev) => ({ ...prev, photos: count }));
		return count;
	} catch (error) {
		console.error("Error counting photos:", error);
		setCount((prev) => ({ ...prev, photos: 0 }));
		return 0;
	}
}

export async function getActiveUsersCount(ay_id, setCount) {
	try {
		const usersRef = collection(db, "users");

		const q = query(
			usersRef,
			where("us_ayID", "==", ay_id),
			where("us_status", "==", "Active")
		);

		const snapshot = await getDocs(q);

		const filteredUsers = snapshot.docs.filter(
			(doc) => doc.data().us_type !== "Super Admin"
		);

		const count = filteredUsers.length;
		setCount((prev) => ({ ...prev, member: count }));
		return count;
	} catch (error) {
		console.error("Error counting users:", error);
		setCount((prev) => ({ ...prev, member: 0 }));
		return 0;
	}
}
