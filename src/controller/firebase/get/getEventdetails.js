import {
	doc,
	getDoc,
	collection,
	query,
	where,
	getDocs,
	onSnapshot,
} from "firebase/firestore";
import { db } from "../../../server/firebaseConfig";

export const getEventDetails = (
	ev_id,
	setEvent,
	setOrganizer,
	setSpeaker,
	setGallery,
	triggerAlert,
	setLoading,
	isForm = true
) => {
	try {
		setLoading(true);

		const eventDocRef = doc(db, "events", ev_id);

		// Listen to real-time updates
		const unsubscribe = onSnapshot(
			eventDocRef,
			async (docSnapshot) => {
				if (docSnapshot.exists()) {
					const eventData = { id: docSnapshot.id, ...docSnapshot.data() };

					setEvent({
						ev_name: eventData.ev_name,
						ev_status: eventData.ev_status,
						ev_type: eventData.ev_type,
						ev_date: eventData.ev_date.toDate().toISOString().split("T")[0],
						ev_starttime: eventData.ev_starttime
							.toDate()
							.toTimeString()
							.slice(0, 5),
						ev_endtime: eventData.ev_endtime
							.toDate()
							.toTimeString()
							.slice(0, 5),
						ev_rsvplink: eventData.ev_rsvplink,
						ev_location: eventData.ev_location,
						ev_overview: eventData.ev_overview,
						ev_photoURL: eventData.ev_photoURL,
					});

					isForm
						? await getEventOrganizer(eventData.ev_organizer, setOrganizer)
						: await getEventOrganizer1(eventData.ev_organizer, setOrganizer);
					await getEventSpeaker(eventDocRef, setSpeaker);
					await getEventGallery(eventDocRef, setGallery);
					setLoading(false);
				} else {
					triggerAlert("danger", `No event found with ID: ${ev_id}`);
					setLoading(false);
				}
			},
			(error) => {
				triggerAlert("danger", `Realtime error: ${error.message}`);
				setLoading(false);
			}
		);

		return unsubscribe;
	} catch (error) {
		triggerAlert("danger", `Unexpected error: ${error.message}`);
		setLoading(false);
	}
};

const getEventOrganizer = async (organizerList, setOrganizer) => {
	try {
		const organizerData = organizerList.map((item) => {
			const val = item.split("|");
			return {
				or_status: "Active",
				or_id: val[0],
				or_name: val[1],
			};
		});

		setOrganizer(organizerData);
	} catch (error) {
		triggerAlert("danger", `Error fetching organizer details:`, error);
		return null;
	}
};

const getEventOrganizer1 = async (organizerList, setOrganizer) => {
	try {
		const organizerData = await Promise.all(
			organizerList.map(async (item) => {
				const [id] = item.split("|");
				const userDocRef = doc(db, "users", id);
				const docSnapshot = await getDoc(userDocRef);

				if (docSnapshot.exists()) {
					const data = docSnapshot.data();
					return {
						or_id: data.uid || id,
						or_name: data.us_fname + " " + data.us_lname || "",
						or_email: data.us_email || "",
						or_photoURL: data.us_photoURL || "",
					};
				}
				return null;
			})
		);

		setOrganizer(organizerData.filter(Boolean));
	} catch (error) {
		triggerAlert("danger", "Error fetching organizer details:", error);
		return null;
	}
};

const getEventSpeaker = async (ev_id, setSpeaker) => {
	try {
		const speakerRef = collection(db, "speaker");
		const q = query(speakerRef, where("sp_evID", "==", ev_id));
		const snapshot = await getDocs(q);

		const speakerData = snapshot.docs.map((doc) => ({
			sp_id: doc.id,
			sp_status: doc.data().sp_status,
			sp_name: doc.data().sp_name,
			sp_info: doc.data().sp_info,
			sp_photoURL: doc.data().sp_photoURL,
		}));

		setSpeaker(speakerData);
	} catch (error) {
		triggerAlert("danger", `Error fetching speaker details:`, error);
		return null;
	}
};

const getEventGallery = async (ev_id, setGallery) => {
	try {
		const photosRef = collection(db, "photos");
		const q = query(photosRef, where("ph_evID", "==", ev_id));
		const snapshot = await getDocs(q);

		const photosData = snapshot.docs.map((doc) => ({
			ga_id: doc.id,
			ga_status: doc.data().ph_status,
			ga_photoURL: doc.data().ph_photoURL,
		}));

		setGallery(photosData);
	} catch (error) {
		triggerAlert("danger", `Error fetching photos details:`, error);
		return null;
	}
};
