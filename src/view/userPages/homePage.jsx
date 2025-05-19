import { useState, useEffect } from "react";
import "../../style/userStyle/home.css";
import photosImg from "../../assets/photos.png";
import aboutUsImg from "../../assets/iconlogo.png";

import { useLocation } from "react-router-dom";
import { useAlert } from "../context/alertProvider";
import { useAcadYear } from "../context/acadyearContext";
import { useLoading } from "../context/loadingProvider";

import {
	goToSlide,
	handleLoadMore,
	nextSlide,
	prevSlide,
} from "../../controller/customAction/homeHandleChange";

import getEvents from "../../controller/firebase/get/getEvents";
import getPhotos from "../../controller/firebase/get/getPhotos";

function HomePage() {
	const location = useLocation();
	const { acadYear, loading } = useAcadYear();
	const { triggerAlert } = useAlert();
	const { setLoading, setPath } = useLoading();

	const [viewStyle, setViewStyle] = useState("slideshow");
	const [currentSlide, setCurrentSlide] = useState(0);
	const [loadGallery, setLoadGallery] = useState(10);
	const [events, setEvent] = useState([]);
	const [photos, setPhoto] = useState([]);

	useEffect(() => {
		if (!loading && acadYear) {
			setPath(location.pathname);

			getEvents(
				acadYear.id,
				null,
				null,
				null,
				setEvent,
				setLoading,
				triggerAlert,
				5
			);

			getPhotos(
				acadYear.id,
				null,
				setPhoto,
				setLoading,
				triggerAlert,
				loadGallery
			);
		}
	}, [loading, acadYear, loadGallery]);

	return (
		<>
			<div className="user-body">
				<main>
					<section className="hero-section">
						<div className="hero-content-flex">
							<div className="hero-content">
								<h1>Google Developer Group</h1>
								<h2>On Campus NU Baliwag</h2>
								<p>
									Empowering students through technology, innovation, and
									networking at National University - Baliwag
								</p>
								<button className="learn-more-btn">Learn More</button>
							</div>
							<div></div>
						</div>
					</section>
					<section className="about-section">
						<div className="about-content">
							<div className="about-text">
								<h1>About Us</h1>
								<p>{acadYear?.ay_about || ""}</p>
								<button className="meet-members-btn">Meet Our Members</button>
							</div>
							<div className="about-logo">
								<img
									src={aboutUsImg}
									alt="gdsc logo"
									className="logo-containers"
								/>
							</div>
						</div>
					</section>
					<section className="what-we-do-section">
						<h2 className="section-title">What We Do</h2>
						<p className="section-description">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</p>
						<div className="services-grid">
							<div className="service-card">
								<div className="service-icon tech-workshops">
									<span>T</span>
								</div>
								<h3>Technical Workshops</h3>
								<p>
									Hands-on sessions on the latest technologies and development
									tools.
								</p>
							</div>
							<div className="service-card">
								<div className="service-icon tech-events">
									<span>E</span>
								</div>
								<h3>Tech Events</h3>
								<p>
									Coding competitions and hackathons to test your skills and
									learn.
								</p>
							</div>
							<div className="service-card">
								<div className="service-icon innovation">
									<span>I</span>
								</div>
								<h3>Innovation Projects</h3>
								<p>Collaborative projects using cutting-edge technologies.</p>
							</div>
							<div className="service-card">
								<div className="service-icon community">
									<span>C</span>
								</div>
								<h3>Community Building</h3>
								<p>Networking opportunities and resources for students.</p>
							</div>
						</div>
					</section>
					{events.length > 0 && (
						<section className="events-section">
							<div className="events-container">
								<div className="events-header">
									<div className="events-title-container">
										<h2 className="section-title">Featured Events</h2>
										<p className="events-intro">
											Join us for our upcoming events and workshops.
										</p>
										<button className="view-all-btn">View All Events</button>
									</div>
									<div className="events-scroll-container">
										<div className="events-scroll">
											{events.map((event) => (
												<div key={event.id} className="event-card">
													<div
														className={`event-image ${event.cssClass || ""}`}
													>
														<img src={event.ev_photoURL} alt={event.ev_name} />
													</div>
													<div className="event-details">
														<h3>{event.ev_name}</h3>
														<p className="event-date">
															{new Date(
																event.ev_date.seconds * 1000
															).toLocaleDateString(undefined, {
																year: "numeric",
																month: "long",
																day: "numeric",
															})}
														</p>
														<p className="event-description">
															{event.ev_overview
																? event.ev_overview.length > 100
																	? event.ev_overview.slice(0, 30) + "..."
																	: event.ev_overview
																: " "}
														</p>
														<a
															href={event.ev_rsvplink}
															className="learn-more-link"
														>
															View Details
														</a>
													</div>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						</section>
					)}

					{photos.length > 0 && (
						<section className="photos-section">
							<h2 className="section-title photos">Chapter Photos</h2>
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
											onClick={() => prevSlide(setCurrentSlide)}
										>
											-
										</button>

										<div className="slide">
											<img
												src={
													photos[currentSlide]?.ph_photoURL ||
													"/placeholder.svg"
												}
												alt={`Photo from event ${
													photos[currentSlide]?.ph_evID?.split("/").pop() || ""
												}`}
												className="slide-image"
											/>
											<div className="slide-caption">
												<h3>{photos[currentSlide]?.ph_name}</h3>
												<p>
													{photos[currentSlide]?.ph_date
														? new Date(
																photos[currentSlide]?.ph_date.seconds * 1000
														  ).toLocaleDateString(undefined, {
																year: "numeric",
																month: "short",
																day: "numeric",
														  })
														: "Date N/A"}
												</p>
											</div>
										</div>

										<button
											className="slide-nav next"
											onClick={() => nextSlide(setCurrentSlide)}
										>
											-
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
												key={photo.id}
												className={`thumbnail ${
													currentSlide === index ? "active" : ""
												}`}
												onClick={() => goToSlide(setCurrentSlide, index)}
											>
												<img
													src={photo.ph_photoURL || "/placeholder.svg"}
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
											<div key={ph.id} className="photo-item">
												<img
													src={ph.ph_photoURL || { photosImg }}
													alt={`Photo from event ${ph.ph_name || ""}`}
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
				<footer>12</footer>
			</div>
		</>
	);
}

export default HomePage;
