import { signOut } from "firebase/auth";
import { auth } from "../../server/firebaseConfig";

export async function handleLogout({ navigate, triggerAlert }) {
	try {
		await signOut(auth);
		triggerAlert("success", "You have been logged out successfully.");
		navigate("/gdsc-nubaliwag/");
	} catch (error) {
		triggerAlert("danger", `Logout failed: ${error.message}`);
	}
}
