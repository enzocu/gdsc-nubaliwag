import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import "../../../style/adminStyle/events.css";
import "../../../style/bootstrapStyle/eventstat.css";
import banner from "../../../assets/banner.png";
import profileIcon from "../../../assets/profileicon.jpg";

import HeaderFormAdmin from "../../components/headerFormAdmin";
import EventStatus from "../../components/boostrap/eventstatModal";

import { useAlert } from "../../context/alertProvider";
import { useUser } from "../../context/userContext";
import { useLoading } from "../../context/loadingProvider";

import { openModal } from "../../../controller/customAction/showcloseModal";
import {
	formatDate,
	formatTime,
} from "../../../controller/customAction/toTimestamp";

import { getEventDetails } from "../../../controller/firebase/get/getEventdetails";

const defaultEvent = {
	ev_name: "Event Title",
	ev_status: "Status",
	ev_type: "Type",
	ev_date: null,
	ev_starttime: null,
	ev_endtime: null,
	ev_location: "-",
	ev_rsvplink: "-",
	ev_overview: "-",
	ev_organizer: "-",
	ev_photoURL: "",
};

function EventsDetails() {
	const location = useLocation();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const id = searchParams.get("id");

	const { triggerAlert } = useAlert();
	const { user, userDetails, loading } = useUser();
	const { setLoading, setPath } = useLoading();

	const [event, setEvent] = useState(defaultEvent);
	const [organizer, setOrganizer] = useState([]);
	const [speaker, setSpeaker] = useState([]);
	const [gallery, setGallery] = useState([]);

	useEffect(() => {
		if (id) {
			setPath(location.pathname);
			const unsubscribe = getEventDetails(
				id,
				setEvent,
				setOrganizer,
				setSpeaker,
				setGallery,
				triggerAlert,
				setLoading,
				false
			);

			return () => unsubscribe();
		}
	}, [id, loading]);

	return (
		<>
			<EventStatus eventId={id} />
			<div className="admin-body details">
				<main>
					<HeaderFormAdmin Title="Event Details" />
					<div className="content-details events">
						<section className="details-image-bannercontainer">
							<img src={banner} alt="Event Banner" />
						</section>
						<section className="details-info-group">
							<div className="details-about">
								<div className="event-header">
									<h1>{event.ev_name}</h1>
									<div className={"event-" + event.ev_status}>
										{event.ev_status}
									</div>
								</div>

								<div className="event-description">
									<h3>About</h3>
									<p>{event.ev_overview}</p>
								</div>

								{organizer.length > 0 && (
									<div className="event-organizers">
										<label>Organizer</label>
										<ul className="organizer-list">
											{organizer.map((org, index) => (
												<li className="organizer-item" key={index}>
													<div className="profile-img">
														<img
															src={org.or_photoURL || profileIcon}
															alt={org.or_name}
														/>
													</div>
													<div className="organizer-info">
														<h4>{org.or_name}</h4>
														<p>{org.or_email}</p>
													</div>
												</li>
											))}
										</ul>
									</div>
								)}

								{speaker.length > 0 && (
									<div className="event-speakers">
										<label>Speaker</label>
										<ul className="speakers-list">
											{speaker.map((sp, index) => (
												<li className="speakers-item" key={index}>
													<div className="profile-img">
														<img
															src={sp.sp_photoURL || profileIcon}
															alt={sp.sp_name}
														/>
													</div>
													<div className="speakers-info">
														<h4>{sp.sp_name}</h4>
														<p>--</p>
													</div>
												</li>
											))}
										</ul>
									</div>
								)}
							</div>

							<div className="event-details">
								<div className="event-datetime">
									<label>Date and Time</label>
									<p>
										{formatDate(event.ev_date)},{" "}
										{formatTime(event.ev_starttime)} to{" "}
										{formatTime(event.ev_endtime)}
									</p>
								</div>
								<div className="event-location">
									<label>Location</label>
									<p>{event.ev_location}</p>
								</div>
								<div className="event-types">
									<label>Event Type</label>
									<p>{event.ev_type}</p>
								</div>
								<div className="event-rsvp">
									<label>RSVP Link</label>
									<p>{event.ev_rsvplink}</p>
								</div>
							</div>
						</section>

						{gallery.length > 0 && (
							<section className="details-gallery">
								<label>Gallery</label>
								<div className="details-gallery-container-list">
									{gallery.map((item, index) => (
										<div className="details-image-container" key={index}>
											<img
												src={
													item.ga_photoURL instanceof File
														? URL.createObjectURL(item.ga_photoURL)
														: item.ga_photoURL
												}
												alt={`gallery-${index}`}
											/>
										</div>
									))}
								</div>
							</section>
						)}
						<section className="details-group details-group-buttons">
							<button
								type="button"
								className="btn form-btn form-btn btn-primary"
								onClick={() => openModal("eventstatModal")}
							>
								Status
							</button>

							<button
								type="submit"
								className="btn form-btn btn-outline-primary"
								onClick={() =>
									navigate(`/admin/events/eventsform?action=edit&id=${id}`)
								}
							>
								Edit
							</button>
						</section>
					</div>
				</main>
			</div>
		</>
	);
}

export default EventsDetails;
