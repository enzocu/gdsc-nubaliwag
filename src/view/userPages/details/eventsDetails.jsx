import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import photosImg from "../../../assets/banner.png";
import profileIcon from "../../../assets/profileicon.jpg";

import { GiPartyFlags } from "react-icons/gi";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { MdAccessTime } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import "../../../style/userStyle/eventsprojects.css";

import { useAlert } from "../../context/alertProvider";
import { useAcadYear } from "../../context/acadyearContext";
import { useLoading } from "../../context/loadingProvider";

import {
	goToSlide,
	handleLoadMore,
	nextSlide,
	prevSlide,
} from "../../../controller/customAction/slideHandleChange";
import Footer from "../../components/footer";
import { getEventDetails } from "../../../controller/firebase/get/getEventdetails";
import {
	formatDate,
	formatTime,
} from "../../../controller/customAction/toTimestamp";

getEventDetails;

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

function EventsDetailsPage() {
	const location = useLocation();
	const { triggerAlert } = useAlert();
	const { setLoading, setPath } = useLoading();

	const [searchParams] = useSearchParams();
	const id = searchParams.get("id");

	const [viewStyle, setViewStyle] = useState("slideshow");
	const [currentSlide, setCurrentSlide] = useState(0);
	const [loadGallery, setLoadGallery] = useState(10);

	const [event, setEvent] = useState(defaultEvent);
	const [organizer, setOrganizer] = useState([]);
	const [speaker, setSpeaker] = useState([]);
	const [photos, setPhoto] = useState([]);
	useEffect(() => {
		if (id) {
			setPath(location.pathname);
			const unsubscribe = getEventDetails(
				id,
				setEvent,
				setOrganizer,
				setSpeaker,
				setPhoto,
				triggerAlert,
				setLoading,
				false
			);

			return () => unsubscribe();
		}
	}, [id]);

	return (
		<>
			<div className="user-body eventdetails">
				<main className="event-main">
					<section className="event-hero-section">
						<img
							src={event.ev_photoURL || photosImg}
							alt="Event"
							className="event-hero-image"
						/>

						<div className="event-title-container">
							<h1 className="event-title">{event.ev_name}</h1>
							<p className="event-status">{event.ev_status}</p>
							<button
								className="btn btn-register"
								onClick={() => (window.location.href = event.ev_rsvplink)}
							>
								Register Now
							</button>
						</div>
					</section>

					<section className="event-content">
						<div className="event-left">
							<div className="event-about">
								<h2 className="about-title">About</h2>
								<p className="about-text">{event.ev_overview}</p>
							</div>
							{organizer.length > 0 && (
								<div className="event-organizers">
									<h3 className="event-label">Organized by</h3>
									<ul className="organizer-list">
										{organizer.map((org, index) => (
											<li className="organizer-item" key={index}>
												<div className="profile-circle">
													<img
														src={org.or_photoURL || profileIcon}
														alt={org.or_name}
														className="event-hero-image"
													/>
												</div>
												<div className="organizer-details">
													<h4 className="organizer-name">{org.or_name}</h4>
													<p className="organizer-email">{org.or_email}</p>
												</div>
											</li>
										))}
									</ul>
								</div>
							)}
							{speaker.length > 0 && (
								<div className="event-speakers">
									<h3 className="event-label">Speakers</h3>
									<ul className="speaker-list">
										{speaker.map((sp, index) => (
											<li className="speaker-item" key={index}>
												<div className="profile-circle">
													<img
														src={sp.sp_photoURL || profileIcon}
														alt={sp.sp_name}
													/>
												</div>
												<div className="speaker-details">
													<h4 className="speaker-name">{sp.sp_name}</h4>
													<p className="speaker-info">{sp.sp_info}</p>
												</div>
											</li>
										))}
									</ul>
								</div>
							)}
						</div>

						<div className="event-right">
							<h3 className="event-label">What You Need to Know</h3>

							<div className="event-info-item">
								<GiPartyFlags className="event-icon" />
								<div className="event-types">
									<label className="event-label">Event Type</label>
									<p className="event-type-value">{event.ev_type}</p>
								</div>
							</div>

							<div className="event-info-item">
								<IoLocationOutline className="event-icon" />
								<div className="event-location">
									<label className="event-label">Location</label>
									<p className="event-location-value">{event.ev_location}</p>
								</div>
							</div>

							<div className="event-info-item">
								<CiCalendarDate className="event-icon" />
								<div className="event-date">
									<label className="event-label">Date</label>
									<p className="event-date-value">
										{formatDate(event.ev_date)}
									</p>
								</div>
							</div>

							<div className="event-info-item">
								<MdAccessTime className="event-icon" />
								<div className="event-time">
									<label className="event-label">Time</label>
									<p className="event-time-value">
										{formatTime(event.ev_starttime)} to{" "}
										{formatTime(event.ev_endtime)}
									</p>
								</div>
							</div>
						</div>
					</section>

					{photos.length > 0 && (
						<section className="photos-section">
							<h2 className="section-title photos">Event Photos</h2>
							<div className="view-toggle">
								<button
									className={`toggle-btn ${
										viewStyle === "slideshow" ? "active" : ""
									}`}
									onClick={() => setViewStyle("slideshow")}
								>
									Slide Show Style
								</button>
								<button
									className={`toggle-btn ${
										viewStyle === "gallery" ? "active" : ""
									}`}
									onClick={() => setViewStyle("gallery")}
								>
									Gallery Style
								</button>
							</div>

							{viewStyle === "slideshow" ? (
								<div className="slideshow-container">
									<div className="slideshow">
										<button
											className="slide-nav prev"
											onClick={() => prevSlide(photos, setCurrentSlide)}
										>
											<IoIosArrowBack />
										</button>

										<div className="slide">
											<img
												src={
													photos[currentSlide]?.ga_photoURL ||
													"/placeholder.svg"
												}
												alt={`Photo from event ${
													photos[currentSlide]?.ga_id?.split("/").pop() || ""
												}`}
												className="slide-image"
											/>
										</div>

										<button
											className="slide-nav next"
											onClick={() => nextSlide(photos, setCurrentSlide)}
										>
											<IoIosArrowForward />
										</button>
									</div>

									<div className="slide-indicators">
										{photos.map((_, index) => (
											<button
												key={index}
												className={`indicator ${
													currentSlide === index ? "active" : ""
												}`}
												onClick={() => goToSlide(setCurrentSlide, index)}
												aria-label={`Go to slide ${index + 1}`}
											/>
										))}
									</div>

									<div className="thumbnails">
										{photos.map((photo, index) => (
											<button
												key={photo.ga_id}
												className={`thumbnail ${
													currentSlide === index ? "active" : ""
												}`}
												onClick={() => goToSlide(setCurrentSlide, index)}
											>
												<img
													src={photo.ga_photoURL || "/placeholder.svg"}
													alt={`Thumbnail ${index + 1}`}
												/>
											</button>
										))}
									</div>
								</div>
							) : (
								<div className="gallery-container">
									<div className="photo-grid">
										{photos.map((ph) => (
											<div key={ph.ga_id} className="photo-item">
												<img
													src={ph.ga_photoURL || { photosImg }}
													alt={`Photo from event ${ph.ga_name || ""}`}
												/>
											</div>
										))}
									</div>

									<button
										className="load-more-btn"
										onClick={() => handleLoadMore(loadGallery, setLoadGallery)}
									>
										{loadGallery === 50 ? "Load Less" : "Load More"}
									</button>
								</div>
							)}
						</section>
					)}
				</main>
				<Footer />
			</div>
		</>
	);
}

export default EventsDetailsPage;
