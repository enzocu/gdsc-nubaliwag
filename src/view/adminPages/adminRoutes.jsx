import { Routes, Route } from "react-router-dom";
import DashboardPage from "./dashboardPage";
import EventsPage from "./eventsPage";
import MembersPage from "./membersPage";
import PhotosPage from "./photosPage";

import DashboardForm from "././forms/dashboardForm";
import EventsForm from "././forms/eventsForm";
import MembersForm from "././forms/memberForm";
import PhotosForm from "././forms/photosForm";

import EventsDetails from "././details/eventsDetails";
import MembersDetails from "././details/memberDetails";

import "../../style/adminStyle/admin.css";
function AdminRoutes() {
	return (
		<Routes>
			{/* Page */}
			<Route
				path="/gdsc-nubaliwag/admin/dashboard"
				element={<DashboardPage />}
			/>
			<Route path="/gdsc-nubaliwag/admin/events" element={<EventsPage />} />
			<Route path="/gdsc-nubaliwag/admin/members" element={<MembersPage />} />

			<Route path="/gdsc-nubaliwag/admin/photos" element={<PhotosPage />} />

			{/* Form */}
			<Route
				path="/gdsc-nubaliwag/admin/dashboard/dashboardform"
				element={<DashboardForm />}
			/>
			<Route
				path="/gdsc-nubaliwag/admin/events/eventsform"
				element={<EventsForm />}
			/>
			<Route
				path="/gdsc-nubaliwag/admin/members/membersform"
				element={<MembersForm />}
			/>
			<Route
				path="/gdsc-nubaliwag/admin/photos/photosform"
				element={<PhotosForm />}
			/>

			{/* Details */}
			<Route
				path="/gdsc-nubaliwag/admin/events/eventsdetails"
				element={<EventsDetails />}
			/>
			<Route
				path="/gdsc-nubaliwag/admin/members/membersdetails"
				element={<MembersDetails />}
			/>
		</Routes>
	);
}

export default AdminRoutes;
