import { Routes, Route } from "react-router-dom";
import HomePage from "./homePage";
import MembersPage from "./membersPage";
import EventsPage from "./eventsPage";
import ProjectsPage from "./projectsPage";
import ContactPage from "./contactPage";
import DashboardPage from "../adminPages/dashboardPage";
import "../../style/userStyle/user.css";

function UserRoutes() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/user/events" element={<EventsPage />} />
			<Route path="/user/coreteam" element={<MembersPage />} />
			<Route path="/user/projects" element={<ProjectsPage />} />
			<Route path="/user/contact" element={<ContactPage />} />
		</Routes>
	);
}

export default UserRoutes;
