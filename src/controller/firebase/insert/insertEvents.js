import {
	collection,
	addDoc,
	Timestamp,
	serverTimestamp,
	doc,
} from "firebase/firestore";
import { db } from "../../../server/firebaseConfig";
import { toTimestamp } from "../../customAction/toTimestamp";

export const insertEvent = async (
	ay_id,
	event,
	organizers,
	speakers,
	gallery,
	triggerAlert,
	setBtnloading
) => {
	try {
		setBtnloading(true);

		const eventData = {
			ev_ayID: ay_id,
			ev_organizer: organizers.map((org) => `${org.or_id}|${org.or_name}`),
			ev_status: "Upcoming",
			ev_type: event.ev_type || "",
			ev_name: event.ev_name || "",
			ev_rsvplink: event.ev_rsvplink || "",
			ev_overview: event.ev_overview || "",

			// Convert to Firebase Timestamps
			ev_date: Timestamp.fromDate(new Date(event.ev_date)),
			ev_starttime: toTimestamp(Timestamp, event.ev_date, event.ev_starttime),
			ev_endtime: toTimestamp(Timestamp, event.ev_date, event.ev_endtime),

			ev_location: event.ev_location || "",
			ev_photoURL: event.ev_photoURL || "",
			ev_create_timestamp: serverTimestamp(),
		};

		const docRef = await addDoc(collection(db, "events"), eventData);
		const eventRef = doc(db, "events", docRef.id);

		// Add speakers
		for (const sp of speakers) {
			const speakerData = {
				sp_evID: eventRef,
				sp_status: "Active",
				sp_name: sp.sp_name || "",
				sp_info: sp.sp_info || "",
				sp_photoURL: sp.sp_photoURL || "",
				sp_create_timestamp: serverTimestamp(),
			};
			await addDoc(collection(db, "speaker"), speakerData);
		}

		// Add gallery images
		for (const ga of gallery) {
			const galleryData = {
				ph_ayID: ay_id,
				ph_evID: eventRef,
				ph_status: "Active",
				ph_type: "Event",
				ph_photoURL: ga.ga_photoURL || "",
				ph_create_timestamp: serverTimestamp(),
			};
			await addDoc(collection(db, "photos"), galleryData);
		}

		triggerAlert(
			"success",
			"Event inserted successfully! Document ID: " + docRef.id
		);
		return docRef.id;
	} catch (error) {
		triggerAlert("danger", "Error inserting event: " + error.message);
		throw error;
	} finally {
		setBtnloading(false);
	}
};
