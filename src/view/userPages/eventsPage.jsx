import { useState, useEffect } from "react";
import "../../style/userStyle/eventsprojects.css";
import event from "../../assets/event.png";

import { IoCalendarClearOutline } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";

import { useNavigate, useLocation } from "react-router-dom";
import { useAlert } from "../context/alertProvider";
import { useAcadYear } from "../context/acadyearContext";
import { useLoading } from "../context/loadingProvider";

import getEvents from "../../controller/firebase/get/getEvents";

function EventsPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const { acadYear, loading } = useAcadYear();
	const { triggerAlert } = useAlert();
	const { setLoading, setPath } = useLoading();

	const [activeTab, setActiveTab] = useState("Upcoming");
	const [events, setEvent] = useState([]);
	const [search, setSearch] = useState(null);

	useEffect(() => {
		if (!loading && acadYear) {
			setPath(location.pathname);

			getEvents(
				acadYear.id,
				activeTab,
				null,
				search,
				setEvent,
				setLoading,
				triggerAlert,
				500
			);
		}
	}, [loading, acadYear, activeTab, search]);
	return (
		<>
			<div className="user-body member">
				<main>
					<section className="header-container">
						<div className="header-content">
							<h1>Events & Activities</h1>
							<p>
								Discover our upcoming and past events, workshops, and
								activities.
							</p>
						</div>
					</section>
					<section className="gdg-container">
						<div className="gdg-tabs">
							<button
								className={`gdg-tab-btn ${
									activeTab === "Upcoming" ? "active" : ""
								}`}
								onClick={() => setActiveTab("Upcoming")}
							>
								Upcoming Events
							</button>
							<button
								className={`gdg-tab-btn ${
									activeTab === "Completed" ? "active" : ""
								}`}
								onClick={() => setActiveTab("Completed")}
							>
								Past Events
							</button>
						</div>
						<div className="gdg-search-container">
							<input
								type="text"
								placeholder="Search"
								className="form-control gdg-search-input"
								value={search || ""}
								onChange={(e) => setSearch(e.target.value)}
							/>
						</div>

						<div className="gdg-grid">
							{events.length === 0 ? (
								<p>No events found.</p>
							) : (
								events.map((ev) => (
									<div className="gdg-event-card" key={ev.id}>
										<div className="gdg-event-image">
											<span className="gdg-event-type">
												{ev.ev_type || "N/A"}
											</span>
											<img
												src={ev.ev_photoURL || "/placeholder.svg"}
												alt={ev.ev_name || "Event Image"}
											/>
										</div>
										<div className="gdg-event-content">
											<h3 className="gdg-event-title">
												{ev.ev_name || "Untitled Event"}
											</h3>

											<div className="gdg-event-details">
												<div className="gdg-event-detail">
													<IoCalendarClearOutline className="gdg-event-icon" />
													<span>
														{ev.ev_date
															? new Date(
																	ev.ev_date.seconds * 1000
															  ).toLocaleDateString(undefined, {
																	year: "numeric",
																	month: "long",
																	day: "numeric",
															  })
															: "Date N/A"}
													</span>
												</div>
												<div className="gdg-event-detail">
													<IoTimeOutline className="gdg-event-icon" />
													<span>
														{ev.ev_starttime && ev.ev_endtime
															? `${new Date(
																	ev.ev_starttime.seconds * 1000
															  ).toLocaleTimeString([], {
																	hour: "2-digit",
																	minute: "2-digit",
															  })} - ${new Date(
																	ev.ev_endtime.seconds * 1000
															  ).toLocaleTimeString([], {
																	hour: "2-digit",
																	minute: "2-digit",
															  })}`
															: "Time N/A"}
													</span>
												</div>
												<div className="gdg-event-detail">
													<IoLocationOutline className="gdg-event-icon" />
													<span>{ev.ev_location || "Location N/A"}</span>
												</div>
											</div>

											<p className="gdg-event-description">
												{ev.ev_overview
													? ev.ev_overview.length > 100
														? ev.ev_overview.slice(0, 30) + "..."
														: ev.ev_overview
													: " "}
											</p>

											<button
												className="gdg-view-details-btn"
												onClick={() =>
													navigate(
														`/gdsc-nubaliwag/user/events/eventsdetails?id=${ev.id}`
													)
												}
											>
												View Details
											</button>
										</div>
									</div>
								))
							)}
						</div>
					</section>
				</main>
				<footer>12</footer>
			</div>
		</>
	);
}

export default EventsPage;
