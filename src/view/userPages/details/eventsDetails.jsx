import { useState, useEffect } from "react";
import photosImg from "../../../assets/banner.png";
import profileIcon from "../../../assets/profileicon.jpg";

import { GiPartyFlags } from "react-icons/gi";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { MdAccessTime } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import "../../../style/userStyle/eventsprojects.css";

import { useLocation } from "react-router-dom";
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

function EventsDetailsPage() {
	const location = useLocation();
	const { acadYear, loading } = useAcadYear();
	const { triggerAlert } = useAlert();
	const { setLoading, setPath } = useLoading();

	const [viewStyle, setViewStyle] = useState("slideshow");
	const [currentSlide, setCurrentSlide] = useState(0);
	const [loadGallery, setLoadGallery] = useState(10);
	const [photos, setPhoto] = useState([
		{
			id: "SM8JoXH5H3fUWyWWGoio",
			ph_type: "Chapter",
			ph_status: "Active",
			ph_date: {
				seconds: 1747785600,
				nanoseconds: 0,
			},
			ph_name: "Wawwwwww",
			ph_photoURL:
				"https://scontent.fcrk1-5.fna.fbcdn.net/v/t39.30808-6/481105501_122262345494006670_4394535082186623823_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHYtma2CYvKV9speVCXum5nx135iuAw2QfHXfmK4DDZBx2aeUcdrWfEQGNJmfhL0G1db87dpvrCvGp5f0bu0_Zp&_nc_ohc=aYMqEDEYcUkQ7kNvwFPB-Ui&_nc_oc=AdlsZclZIAAKBT6wcX3gxEkheOahL9mpYHdJuzXkdjDvWr2O29UXLiW--IoLeaA9F7E&_nc_zt=23&_nc_ht=scontent.fcrk1-5.fna&_nc_gid=0XdGZgWHG5wT4ezxDqetpg&oh=00_AfKsKPIuKv30kmIQo3PcozWTkp-G8d-ZDBojJLh-Mm9Eug&oe=682D6752",
			ph_create_timestamp: {
				seconds: 1747633150,
				nanoseconds: 276000000,
			},
			ph_ayID: {
				converter: null,
				_key: {
					path: {
						segments: [
							"projects",
							"gdscwebsite-796a1",
							"databases",
							"(default)",
							"documents",
							"academicyear",
							"DvEIUL3qVlvYpCRYQH26",
						],
						offset: 5,
						len: 2,
					},
				},
				type: "document",
				firestore: {
					app: {
						_isDeleted: false,
						_options: {
							apiKey: "AIzaSyA-ria3NwOiHWmmcWP1HKSiAvthlRkRmb0",
							authDomain: "gdscwebsite-796a1.firebaseapp.com",
							projectId: "gdscwebsite-796a1",
							storageBucket: "gdscwebsite-796a1.firebasestorage.app",
							messagingSenderId: "212988514142",
							appId: "1:212988514142:web:c1094363a5a988708589cf",
						},
						_config: {
							name: "[DEFAULT]",
							automaticDataCollectionEnabled: false,
						},
						_name: "[DEFAULT]",
						_automaticDataCollectionEnabled: false,
						_container: {
							name: "[DEFAULT]",
							providers: {},
						},
					},
					databaseId: {
						projectId: "gdscwebsite-796a1",
						database: "(default)",
					},
					settings: {
						host: "firestore.googleapis.com",
						ssl: true,
						isUsingEmulator: false,
						ignoreUndefinedProperties: false,
						cacheSizeBytes: 41943040,
						experimentalForceLongPolling: false,
						experimentalAutoDetectLongPolling: true,
						experimentalLongPollingOptions: {},
						useFetchStreams: true,
					},
				},
			},
		},
		{
			id: "9JLpn4GGJFvmvRfAjTbR",
			ph_photoURL:
				"https://scontent.fcrk1-5.fna.fbcdn.net/v/t39.30808-6/481105501_122262345494006670_4394535082186623823_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHYtma2CYvKV9speVCXum5nx135iuAw2QfHXfmK4DDZBx2aeUcdrWfEQGNJmfhL0G1db87dpvrCvGp5f0bu0_Zp&_nc_ohc=aYMqEDEYcUkQ7kNvwFPB-Ui&_nc_oc=AdlsZclZIAAKBT6wcX3gxEkheOahL9mpYHdJuzXkdjDvWr2O29UXLiW--IoLeaA9F7E&_nc_zt=23&_nc_ht=scontent.fcrk1-5.fna&_nc_gid=0XdGZgWHG5wT4ezxDqetpg&oh=00_AfKsKPIuKv30kmIQo3PcozWTkp-G8d-ZDBojJLh-Mm9Eug&oe=682D6752",
			ph_update_timestamp: {
				seconds: 1747595155,
				nanoseconds: 819000000,
			},
			ph_status: "Active",
			ph_date: {
				seconds: 1747872000,
				nanoseconds: 0,
			},
			ph_ayID: {
				converter: null,
				_key: {
					path: {
						segments: [
							"projects",
							"gdscwebsite-796a1",
							"databases",
							"(default)",
							"documents",
							"academicyear",
							"DvEIUL3qVlvYpCRYQH26",
						],
						offset: 5,
						len: 2,
					},
				},
				type: "document",
				firestore: {
					app: {
						_isDeleted: false,
						_options: {
							apiKey: "AIzaSyA-ria3NwOiHWmmcWP1HKSiAvthlRkRmb0",
							authDomain: "gdscwebsite-796a1.firebaseapp.com",
							projectId: "gdscwebsite-796a1",
							storageBucket: "gdscwebsite-796a1.firebasestorage.app",
							messagingSenderId: "212988514142",
							appId: "1:212988514142:web:c1094363a5a988708589cf",
						},
						_config: {
							name: "[DEFAULT]",
							automaticDataCollectionEnabled: false,
						},
						_name: "[DEFAULT]",
						_automaticDataCollectionEnabled: false,
						_container: {
							name: "[DEFAULT]",
							providers: {},
						},
					},
					databaseId: {
						projectId: "gdscwebsite-796a1",
						database: "(default)",
					},
					settings: {
						host: "firestore.googleapis.com",
						ssl: true,
						isUsingEmulator: false,
						ignoreUndefinedProperties: false,
						cacheSizeBytes: 41943040,
						experimentalForceLongPolling: false,
						experimentalAutoDetectLongPolling: true,
						experimentalLongPollingOptions: {},
						useFetchStreams: true,
					},
				},
			},
			ph_name: "Waw1",
			ph_type: "Chapter",
			ph_create_timestamp: {
				seconds: 1747595111,
				nanoseconds: 939000000,
			},
		},
	]);

	return (
		<>
			<div className="user-body eventdetails">
				<main className="event-main">
					<section className="event-hero-section">
						<img src={photosImg} alt="Event" className="event-hero-image" />

						<div className="event-title-container">
							<h1 className="event-title">
								Explore IT: A Tech and Application Showcase
							</h1>
							<p className="event-status">Status</p>
							<button className="btn btn-register">Register Now</button>
						</div>
					</section>

					<section className="event-content">
						<div className="event-left">
							<div className="event-about">
								<h2 className="about-title">About</h2>
								<p className="about-text">
									Lorem ipsum dolor sit, amet consectetur adipisicing elit.
									Officia iste debitis culpa repellat ab, consequatur eaque ad
									quaerat voluptatum sed? Iure suscipit totam assumenda ad
									provident! Officia error voluptates ex.
								</p>
							</div>

							<div className="event-organizers">
								<h3 className="event-label">Organized by</h3>
								<ul className="organizer-list">
									<li className="organizer-item">
										<div className="profile-circle">
											<img
												src={profileIcon}
												alt="Event"
												className="event-hero-image"
											/>
										</div>
										<div className="organizer-details">
											<h4 className="organizer-name">Lawrence Cunanan</h4>
											<p className="organizer-email">
												lawrencecunanan@gmail.com
											</p>
										</div>
									</li>
									<li className="organizer-item">
										<div className="profile-circle">
											<img
												src={profileIcon}
												alt="Event"
												className="event-hero-image"
											/>
										</div>
										<div className="organizer-details">
											<h4 className="organizer-name">Lawrence Cunanan</h4>
											<p className="organizer-email">
												lawrencecunanan@gmail.com
											</p>
										</div>
									</li>
								</ul>
							</div>

							<div className="event-speakers">
								<h3 className="event-label">Speakers</h3>
								<ul className="speaker-list">
									<li className="speaker-item">
										<div className="profile-circle">
											<img
												src={profileIcon}
												alt="Event"
												className="event-hero-image"
											/>
										</div>
										<div className="speaker-details">
											<h4 className="speaker-name">Lawrence Cunanan</h4>
											<p className="speaker-info">
												Lorem ipsum dolor sit, amet consectetur adipisicing
												elit. Expedita, maxime, iste deserunt sapiente maiores
												voluptates dolores, suscipit blanditiis facere sunt
												voluptatem doloremque nisi! Quisquam illum, blanditiis
												odio porro molestias libero!
											</p>
										</div>
									</li>

									<li className="speaker-item">
										<div className="profile-circle">
											<img
												src={profileIcon}
												alt="Event"
												className="event-hero-image"
											/>
										</div>
										<div className="speaker-details">
											<h4 className="speaker-name">Lawrence Cunanan</h4>
											<p className="speaker-info">
												Lorem ipsum dolor sit, amet consectetur adipisicing
												elit. Expedita, maxime, iste deserunt sapiente maiores
												voluptates dolores, suscipit blanditiis facere sunt
												voluptatem doloremque nisi! Quisquam illum, blanditiis
												odio porro molestias libero!
											</p>
										</div>
									</li>
								</ul>
							</div>
						</div>

						<div className="event-right">
							<h3 className="event-label">What You Need to Know</h3>

							<div className="event-info-item">
								<GiPartyFlags className="event-icon" />
								<div className="event-types">
									<label className="event-label">Event Type</label>
									<p className="event-type-value">Seminar</p>
								</div>
							</div>

							<div className="event-info-item">
								<IoLocationOutline className="event-icon" />
								<div className="event-location">
									<label className="event-label">Location</label>
									<p className="event-location-value">Room 306</p>
								</div>
							</div>

							<div className="event-info-item">
								<CiCalendarDate className="event-icon" />
								<div className="event-date">
									<label className="event-label">Date</label>
									<p className="event-date-value">Feb 8 2025</p>
								</div>
							</div>

							<div className="event-info-item">
								<MdAccessTime className="event-icon" />
								<div className="event-time">
									<label className="event-label">Time</label>
									<p className="event-time-value">8:10am to 9am</p>
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
				<Footer />
			</div>
		</>
	);
}

export default EventsDetailsPage;
