import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../server/firebaseConfig";
import { closeModal } from "../customAction/showcloseModal";

export async function handleLogin({
	email,
	password,
	setLoading,
	triggerAlert,
	navigate,
}) {
	try {
		setLoading(true);
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;

		closeModal("loginModal");

		triggerAlert(
			"success",
			`Welcome to Google Developer Student Clubs!\n\nEmail: ${user.email}`
		);
		navigate("/admin/dashboard");
	} catch (error) {
		triggerAlert("danger", error.message);
	} finally {
		setLoading(false);
	}
}
