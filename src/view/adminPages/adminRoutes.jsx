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
			<Route path="/admin/dashboard" element={<DashboardPage />} />
			<Route path="/admin/events" element={<EventsPage />} />
			<Route path="/admin/members" element={<MembersPage />} />

			<Route path="/admin/photos" element={<PhotosPage />} />

			{/* Form */}
			<Route
				path="/admin/dashboard/dashboardform"
				element={<DashboardForm />}
			/>
			<Route path="/admin/events/eventsform" element={<EventsForm />} />
			<Route path="/admin/members/membersform" element={<MembersForm />} />
			<Route path="/admin/photos/photosform" element={<PhotosForm />} />

			{/* Details */}
			<Route path="/admin/events/eventsdetails" element={<EventsDetails />} />
			<Route
				path="/admin/members/membersdetails"
				element={<MembersDetails />}
			/>
		</Routes>
	);
}

export default AdminRoutes;
