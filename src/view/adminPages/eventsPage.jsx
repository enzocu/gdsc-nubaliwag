import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../../style/adminStyle/events.css";
import uxplorer from "../../assets/uxplorer.png";

import { MdAdd } from "react-icons/md";

import SideBar from "../components/sideBar";
import HeaderPageAdmin from "../components/headerPageAdmin";

import { useUser } from "../context/userContext";
import { useLoading } from "../context/loadingProvider";
import { useAlert } from "../context/alertProvider";

import { toggleDropdown } from "../../controller/customAction/showcloseModal";

import getEvents from "../../controller/firebase/get/getEvents";
import { getAcademicYears } from "../../controller/firebase/get/getAcademicYears";

function EventsPage() {
	const location = useLocation();

	const { user, userDetails, loading } = useUser();
	const { triggerAlert } = useAlert();
	const { setLoading, setPath } = useLoading();

	const [search, setSearch] = useState(null);
	const [evStatus, setStatus] = useState(null);
	const [evType, setType] = useState(null);
	const [event, setEvent] = useState([]);
	const [academicYear, setAcademicYear] = useState([]);
	const [acadyear, setAcadyear] = useState(null);

	useEffect(() => {
		if (!loading && user && userDetails) {
			setPath(location.pathname);

			getEvents(
				search == null || search == ""
					? acadyear == null
						? userDetails.us_ayID.id
						: acadyear
					: null,
				evStatus,
				evType,
				search,
				setEvent,
				setLoading,
				triggerAlert,
				500
			);
		}
	}, [loading, search, acadyear, evStatus, evType]);

	useEffect(() => {
		if (!loading && user && userDetails) {
			getAcademicYears(null, setAcademicYear);
		}
	}, [loading]);

	return (
		<>
			<div className="admin-body">
				<SideBar />
				<main>
					<HeaderPageAdmin Title="Events" />
					<div className="content-page events">
						<section className="function-container">
							<div className="filter-group">
								<div className="input-group ">
									<input
										type="text"
										className="form-control"
										placeholder="Search"
										value={search || ""}
										onChange={(e) => setSearch(e.target.value)}
									/>

									<button
										type="button"
										className="btn btn-outline-primary dropdown-toggle form-btn"
										onClick={() => toggleDropdown("status")}
									>
										Status
									</button>
									<ul className="dropdown-menu form-menu" id="status">
										<li
											className="dropdown-item"
											onClick={() => {
												setStatus(null);
												toggleDropdown("status");
											}}
										>
											All
										</li>
										<li
											className="dropdown-item"
											onClick={() => {
												setStatus("Upcoming");
												toggleDropdown("status");
											}}
										>
											Upcoming
										</li>
										<li
											className="dropdown-item"
											onClick={() => {
												setStatus("Completed");
												toggleDropdown("status");
											}}
										>
											Completed
										</li>
										<li
											className="dropdown-item"
											onClick={() => {
												setStatus("Archived");
												toggleDropdown("status");
											}}
										>
											Archieved
										</li>
									</ul>

									<button
										type="button"
										className="btn btn-outline-primary dropdown-toggle form-btn"
										data-bs-toggle="dropdown"
										onClick={() => toggleDropdown("acadyear")}
									>
										Academic Year
									</button>
									<ul className="dropdown-menu form-menu" id="acadyear">
										{academicYear.map((item) => (
											<li
												className="dropdown-item"
												key={item.id}
												onClick={() => {
													setAcadyear(item.id);
													toggleDropdown("acadyear");
												}}
											>{`A.Y ${item.ay_academicyear}`}</li>
										))}
									</ul>
								</div>
							</div>

							<NavLink to="/gdsc-nubaliwag/admin/events/eventsform?action=add">
								<button className="btn btn-primary form-btn">
									<MdAdd />
									<span>Add Event</span>
								</button>
							</NavLink>
						</section>
						<section className="events-list">
							{event.length === 0 ? (
								<p className="no-records-message">No events found.</p>
							) : (
								event.map((ev) => (
									<NavLink
										key={ev.id}
										to={`/gdsc-nubaliwag/admin/events/eventsdetails?id=${ev.id}`}
									>
										<div className="event-card">
											<div className="event-photo">
												<img
													src={ev.ev_photoURL || uxplorer}
													alt={ev.ev_name || "Event Image"}
												/>
											</div>
											<div className="event-status">
												<div className="event-type">{ev.ev_type || "N/A"}</div>
												<div className={"event-" + ev.ev_status}>
													{ev.ev_status || "Unknown"}
												</div>
											</div>
											<div className="details">
												<h4>{ev.ev_name || "Untitled Event"}</h4>
												<p>
													{ev.ev_date
														? new Date(
																ev.ev_date.seconds * 1000
														  ).toLocaleDateString(undefined, {
																year: "numeric",
																month: "short",
																day: "numeric",
														  })
														: "Date N/A"}
												</p>
											</div>
										</div>
									</NavLink>
								))
							)}
						</section>
					</div>
				</main>
			</div>
		</>
	);
}

export default EventsPage;
