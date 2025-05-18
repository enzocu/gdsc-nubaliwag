import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../server/firebaseConfig";
import { closeModal } from "../../customAction/showcloseModal";

export const updateEventStatus = async (
	eventId,
	newStatus,
	triggerAlert,
	setLoading
) => {
	try {
		setLoading(true);

		const eventDocRef = doc(db, "events", eventId);

		await updateDoc(eventDocRef, {
			ev_status: newStatus,
		});

		triggerAlert("success", "Event status updated successfully!");
	} catch (error) {
		triggerAlert("danger", `Error updating event status: ${error.message}`);
	} finally {
		closeModal("eventstatModal");
		setLoading(false);
	}
};
