import {
	collection,
	query,
	where,
	getDocs,
	doc,
	orderBy,
	limit as limitFn,
} from "firebase/firestore";
import { db } from "../../../server/firebaseConfig";

async function getEvents(
	ay_id = null,
	ev_status = null,
	ev_type = null,
	search = null,
	setEvent,
	setLoading,
	triggerAlert,
	limit = 1000
) {
	try {
		setLoading(true);

		const eventRef = collection(db, "events");
		const conditions = [];

		if (ay_id) {
			const ayDocRef = doc(db, "academicyear", ay_id);
			conditions.push(where("ev_ayID", "==", ayDocRef));
		}

		if (ev_status) {
			conditions.push(where("ev_status", "==", ev_status));
		}

		if (ev_type) {
			conditions.push(where("ev_type", "==", ev_type));
		}

		const q = query(
			eventRef,
			...conditions,
			orderBy("ev_create_timestamp", "desc"),
			limitFn(limit)
		);

		const querySnapshot = await getDocs(q);

		let events = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));

		if (search) {
			const lowerSearch = search.toLowerCase();
			events = events.filter((ev) =>
				ev.ev_name?.toLowerCase().includes(lowerSearch)
			);
		}

		setEvent(events);
		setLoading(false);
		return events;
	} catch (error) {
		triggerAlert("danger", "Error fetching events: " + error.message);
		console.log(error.message);
		setLoading(false);
		return [];
	}
}

export default getEvents;
