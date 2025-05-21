import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { closeModal } from "../../customAction/showcloseModal";

export const resetUserPassword = async (triggerAlert, setLoading) => {
	try {
		setLoading(true);
		const auth = getAuth();
		const user = auth.currentUser;

		if (!user || !user.email) {
			throw new Error("No authenticated user with a valid email found.");
		}

		await sendPasswordResetEmail(auth, user.email);

		triggerAlert("success", "Password reset email sent successfully.");
	} catch (error) {
		console.error("Error sending password reset email:", error);
		triggerAlert("danger", error.message || "Failed to send reset email.");
	} finally {
		setLoading(false);
		closeModal("accountModal");
	}
};
