import "../../style/userStyle/home.css";
import photosImg from "../../assets/photos.png";
import aboutUsImg from "../../assets/aboutUs.png";
import event from "../../assets/event.png";
import { useState } from "react";

function HomePage() {
	const [viewStyle, setViewStyle] = useState("slideshow");
	const [currentSlide, setCurrentSlide] = useState(0);

	const photos = [
		{
			id: 1,
			src: photosImg,
			alt: "UXplorer event with team members",
			title: "UXplorer 2025",
			date: "January 1, 2025",
		},
		{
			id: 2,
			src: photosImg,
			alt: "Team workshop",
			title: "Workshop 2025",
			date: "February 15, 2025",
		},
		{
			id: 3,
			src: photosImg,
			alt: "Hackathon event",
			title: "Hackathon 2025",
			date: "March 20, 2025",
		},
		{
			id: 4,
			src: photosImg,
			alt: "Community meetup",
			title: "Meetup 2025",
			date: "April 5, 2025",
		},
		{
			id: 5,
			src: photosImg,
			alt: "Tech conference",
			title: "Conference 2025",
			date: "May 10, 2025",
		},
		{
			id: 6,
			src: photosImg,
			alt: "Coding session",
			title: "Code Camp 2025",
			date: "June 15, 2025",
		},
	];

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
	};

	const goToSlide = (index) => {
		setCurrentSlide(index);
	};
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
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									Ut enim ad minim veniam, quis nostrud exercitation ullamco
									laboris nisi ut aliquip ex ea commodo consequat.
								</p>
								<p>
									Duis aute irure dolor in reprehenderit in voluptate velit esse
									cillum dolore eu fugiat nulla pariatur. Excepteur sint
									occaecat cupidatat non proident, sunt in culpa qui.
								</p>
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
										<div className="event-card">
											<div className="event-image uxplorer">
												<img src={event} alt="" />
											</div>
											<div className="event-details">
												<h3>UXplorer</h3>
												<p className="event-date">August 30, 2024 • 10:00 AM</p>
												<p className="event-description">
													Brief Description of event.
												</p>
												<a href="#" className="learn-more-link">
													Learn More
												</a>
											</div>
										</div>
										<div className="event-card">
											<div className="event-image uxplorer">
												<img src={event} alt="" />
											</div>
											<div className="event-details">
												<h3>UXplorer</h3>
												<p className="event-date">August 30, 2024 • 10:00 AM</p>
												<p className="event-description">
													Brief Description of event.
												</p>
												<a href="#" className="learn-more-link">
													Learn More
												</a>
											</div>
										</div>
										<div className="event-card">
											<div className="event-image uxplorer">
												<img src={event} alt="" />
											</div>
											<div className="event-details">
												<h3>UXplorer</h3>
												<p className="event-date">August 30, 2024 • 10:00 AM</p>
												<p className="event-description">
													Brief Description of event.
												</p>
												<a href="#" className="learn-more-link">
													Learn More
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
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
									<button className="slide-nav prev" onClick={prevSlide}>
										-
									</button>
									<div className="slide">
										<img
											src={photos[currentSlide].src || { aboutUsImg }}
											alt={photos[currentSlide].alt}
											className="slide-image"
										/>
										<div className="slide-caption">
											<h3>{photos[currentSlide].title}</h3>
											<p>{photos[currentSlide].date}</p>
										</div>
									</div>
									<button className="slide-nav next" onClick={nextSlide}>
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
											onClick={() => goToSlide(index)}
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
											onClick={() => goToSlide(index)}
										>
											<img
												src={photo.src || "../../assets/homeBg.png"}
												alt={`Thumbnail ${index + 1}`}
											/>
										</button>
									))}
								</div>
							</div>
						) : (
							<div className="gallery-container">
								<div className="photo-grid">
									{photos.map((photo) => (
										<div key={photo.id} className="photo-item">
											<img
												src={photo.src || "/placeholder.svg"}
												alt={photo.alt}
											/>
										</div>
									))}
								</div>
								<button className="load-more-btn">LOAD MORE</button>
							</div>
						)}
					</section>
				</main>
			</div>
		</>
	);
}

export default HomePage;
