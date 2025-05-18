import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../../style/adminStyle/dashboard.css";

import { IoCalendarClearOutline } from "react-icons/io5";
import { MdOutlinePeopleAlt, MdOutlineInsertPhoto } from "react-icons/md";
import { IoArrowForwardSharp } from "react-icons/io5";

import SideBar from "../components/SideBar";
import HeaderPageAdmin from "../components/headerPageAdmin";

import { useAlert } from "../context/alertProvider";
import { useUser } from "../context/userContext";
import { useLoading } from "../context/loadingProvider";

import getEvents from "../../controller/firebase/get/getEvents";
import { getUsersWithoutRoles } from "../../controller/firebase/get/getUsersWithoutRoles";
import { getAcademicYearMatch } from "../../controller/firebase/get/getAcademicYearMatch";
import {
	getActiveEventsCount,
	getActivePhotosCount,
	getActiveUsersCount,
} from "../../controller/firebase/get/getCount";

function DashboardPage() {
	const location = useLocation();
	const navigate = useNavigate();

	const { user, userDetails, loading } = useUser();
	const { triggerAlert } = useAlert();
	const { setLoading, setPath } = useLoading();

	const [count, setCount] = useState({ events: 0, member: 0, photos: 0 });
	const [event, setEvent] = useState([]);
	const [member, setMember] = useState([]);

	useEffect(() => {
		if (!loading && user && userDetails) {
			const ay_id = userDetails.us_ayID;
			setPath(location.pathname);
			getActiveUsersCount(ay_id, setCount);
			getActiveEventsCount(ay_id, setCount);
			getActivePhotosCount(ay_id, setCount);

			getEvents(
				ay_id.id,
				null,
				null,
				null,
				setEvent,
				setLoading,
				triggerAlert,
				10
			);
			getUsersWithoutRoles(ay_id, 10, setMember, setLoading, triggerAlert);
		}
	}, [loading, location.pathname]);

	const handleAdd = () => {
		if (!loading && user && userDetails) {
			getAcademicYearMatch(
				userDetails.us_ayID,
				setLoading,
				triggerAlert,
				navigate
			);
		}
	};

	return (
		<>
			<div className="admin-body">
				<SideBar />
				<main>
					<HeaderPageAdmin Title="Dashboard" handleAdd={handleAdd} />
					<div className="content-page dashboard">
						<section className="dashboard-stats">
							<div className="dashboard-stat events">
								<div className="stat-title">
									<h3>Event This Year</h3>
									<IoCalendarClearOutline className="icon" />
								</div>
								<div className="stat-value">
									<h1>{count.events}</h1>
								</div>
							</div>
							<div className="dashboard-stat members">
								<div className="stat-title">
									<h3>Members This Year</h3>
									<MdOutlinePeopleAlt className="icon" />
								</div>
								<div className="stat-value">
									<h1>{count.member}</h1>
								</div>
							</div>
							<div className="dashboard-stat photos">
								<div className="stat-title">
									<h3>Photos This Year</h3>
									<MdOutlineInsertPhoto className="icon" />
								</div>
								<div className="stat-value">
									<h1>{count.photos}</h1>
								</div>
							</div>
						</section>
						<section className="recent-entries">
							<div className="recent-entry recent-event">
								<h3>Recently Added Event</h3>
								<div className="recent-event-list">
									{event.length > 0 ? (
										event.map((ev) => (
											<NavLink
												key={ev.id}
												to={`/gdsc-nubaliwag/admin/events/eventsdetails?id=${ev.id}`}
											>
												<div className="event-container">
													<div className="event-details">
														<h4>{ev.ev_name}</h4>
														<p>
															{new Date(
																ev.ev_date.seconds * 1000
															).toLocaleDateString("en-US", {
																month: "short",
																day: "numeric",
																year: "numeric",
															})}
														</p>
													</div>
													<IoArrowForwardSharp className="icon" />
												</div>
											</NavLink>
										))
									) : (
										<div className="event-container">
											<div className="event-details">
												<h4>No recent</h4>
												<p>
													As of{" "}
													{new Date().toLocaleDateString("en-US", {
														month: "short",
														day: "numeric",
														year: "numeric",
													})}
												</p>
											</div>
										</div>
									)}
								</div>
							</div>

							<div className="recent-entry recent-member">
								<h3>Recently Added Member</h3>
								<div className="recent-member-list">
									{member.length > 0 ? (
										member.map((mem) => (
											<NavLink
												to={`/gdsc-nubaliwag/admin/members/membersform?action=edit&id=${mem.id}`}
												key={mem.id}
											>
												<div className="member-container">
													<div className="member-details">
														<h4>
															{mem.us_fname} {mem.us_lname}
														</h4>
														<p>
															{mem.us_create_timestamp
																? new Date(
																		mem.us_create_timestamp.seconds * 1000
																  ).toLocaleDateString("en-US", {
																		month: "short",
																		day: "numeric",
																		year: "numeric",
																  })
																: "Unknown Date"}
														</p>
													</div>
													<IoArrowForwardSharp className="icon" />
												</div>
											</NavLink>
										))
									) : (
										<div className="member-container">
											<div className="member-details">
												<h4>No recent</h4>
												<p>
													As of{" "}
													{new Date().toLocaleDateString("en-US", {
														month: "short",
														day: "numeric",
														year: "numeric",
													})}
												</p>
											</div>
										</div>
									)}
								</div>
							</div>
						</section>
					</div>
				</main>
			</div>
		</>
	);
}

export default DashboardPage;
