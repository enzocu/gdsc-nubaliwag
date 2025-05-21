import { getAuth, updateEmail, sendEmailVerification } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../server/firebaseConfig";
import { closeModal } from "../../customAction/showcloseModal";

export const updateUserEmail = async (newEmail, triggerAlert, setLoading) => {
	try {
		setLoading(true);
		const auth = getAuth();
		const user = auth.currentUser;

		if (!user) {
			throw new Error("No authenticated user found.");
		}

		if (!user.emailVerified) {
			await sendEmailVerification(user);
			throw new Error(
				"Your current email is not verified. Verification email has been sent. Please verify your current email before changing to a new one."
			);
		}

		// Now update the email
		await updateEmail(user, newEmail);

		// Update Firestore with the new email
		const userDocRef = doc(db, "users", user.uid);
		await updateDoc(userDocRef, { us_email: newEmail });

		// Send verification email to the NEW email address
		await sendEmailVerification(user);

		triggerAlert(
			"success",
			`Email updated successfully. A verification email has been sent to ${newEmail}. Please verify your new email.`
		);
	} catch (error) {
		console.error("Error updating user email:", error);
		triggerAlert("danger", error.message || "Failed to update email.");
	} finally {
		setLoading(false);
		closeModal("accountModal");
	}
};
