import {
	collection,
	query,
	where,
	getDocs,
	limit as setLimit,
	orderBy,
	doc,
} from "firebase/firestore";
import { db } from "../../../server/firebaseConfig";

async function getPhotos(
	ay_id = null,
	search = null,
	setPhotos,
	setLoading,
	triggerAlert,
	limit = 1000
) {
	try {
		setLoading(true);

		const photoRef = collection(db, "photos");
		const conditions = [
			where("ph_status", "==", "Active"),
			where("ph_type", "==", "Chapter"),
		];

		if (ay_id) {
			const ayDocRef = doc(db, "academicyear", ay_id);
			conditions.push(where("ph_ayID", "==", ayDocRef));
		}

		const q = query(
			photoRef,
			...conditions,
			orderBy("ph_create_timestamp", "desc"),
			setLimit(limit)
		);

		const querySnapshot = await getDocs(q);

		let photos = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));

		if (search) {
			const lowerSearch = search.toLowerCase();
			photos = photos.filter((ph) =>
				ph.ph_name?.toLowerCase().includes(lowerSearch)
			);
		}
		console.log(photos);
		setPhotos(photos);
		setLoading(false);
		return photos;
	} catch (error) {
		triggerAlert("danger", "Error fetching photos: " + error.message);
		console.log(error.message);
		setLoading(false);
		return [];
	}
}

export default getPhotos;
