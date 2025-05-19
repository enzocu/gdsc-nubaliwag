import { Routes, Route } from "react-router-dom";
import HomePage from "./homePage";
import MembersPage from "./membersPage";
import EventsPage from "./eventsPage";
import ProjectsPage from "./projectsPage";
import ContactPage from "./contactPage";
import EventsDetailsPage from "./details/eventsDetails";
import "../../style/userStyle/user.css";
function UserRoutes() {
	return (
		<Routes>
			<Route path="/gdsc-nubaliwag/" element={<HomePage />} />
			<Route path="/gdsc-nubaliwag/user/events" element={<EventsPage />} />
			<Route path="/gdsc-nubaliwag/user/coreteam" element={<MembersPage />} />
			<Route path="/gdsc-nubaliwag/user/projects" element={<ProjectsPage />} />
			<Route path="/gdsc-nubaliwag/user/contact" element={<ContactPage />} />

			{/* Details */}
			<Route
				path="/gdsc-nubaliwag/user/events/eventsdetails"
				element={<EventsDetailsPage />}
			/>
		</Routes>
	);
}

export default UserRoutes;
