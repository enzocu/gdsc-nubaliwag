import "../../style/userStyle/eventsprojects.css";
import project from "../../assets/project.png";
import { useState } from "react";
import { IoCalendarClearOutline } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";

function ProjectsPage() {
	const [activeTab, setActiveTab] = useState("upcoming");

	return (
		<>
			<div className="user-body member">
				<main>
					<section className="header-container">
						<div className="header-content">
							<h1>Our Projects</h1>
							<p>
								Innovative projects created by GDG: On Campus NU Baliwag members
							</p>
						</div>
					</section>
					<section className="gdg-container">
						<div className="gdg-search-container">
							<input
								type="text"
								placeholder="Search"
								className="form-control gdg-search-input"
							/>
						</div>

						<div className="gdg-grid">
							<div className="gdg-event-card">
								<div className="gdg-event-image">
									<span className="gdg-event-type">Conference</span>
									<img src={project} alt="" />
								</div>
								<div className="gdg-event-content">
									<h3 className="gdg-event-title">UXplorer</h3>

									<div className="gdg-event-details">
										<div className="gdg-event-detail">
											<IoCalendarClearOutline className="gdg-event-icon" />
											<span>August 30, 2024</span>
										</div>
										<div className="gdg-event-detail">
											<IoTimeOutline className="gdg-event-icon" />
											<span>10:00 AM - 5:00 PM</span>
										</div>
										<div className="gdg-event-detail">
											<IoLocationOutline className="gdg-event-icon" />
											<span>Room 306</span>
										</div>
									</div>
									<p className="gdg-event-description">
										A creative UX workshop to explore modern design trends.
									</p>
									<button className="gdg-view-details-btn">View Details</button>
								</div>
							</div>

							<div className="gdg-event-card">
								<div className="gdg-event-image">
									<span className="gdg-event-type">Conference</span>
									<img src={project} alt="" />
								</div>
								<div className="gdg-event-content">
									<h3 className="gdg-event-title">UXplorer</h3>

									<div className="gdg-event-details">
										<div className="gdg-event-detail">
											<IoCalendarClearOutline className="gdg-event-icon" />
											<span>August 30, 2024</span>
										</div>
										<div className="gdg-event-detail">
											<IoTimeOutline className="gdg-event-icon" />
											<span>10:00 AM - 5:00 PM</span>
										</div>
										<div className="gdg-event-detail">
											<IoLocationOutline className="gdg-event-icon" />
											<span>Room 306</span>
										</div>
									</div>
									<p className="gdg-event-description">
										A creative UX workshop to explore modern design trends.
									</p>
									<button className="gdg-view-details-btn">View Details</button>
								</div>
							</div>

							<div className="gdg-event-card">
								<div className="gdg-event-image">
									<span className="gdg-event-type">Conference</span>
									<img src={project} alt="" />
								</div>
								<div className="gdg-event-content">
									<h3 className="gdg-event-title">UXplorer</h3>

									<div className="gdg-event-details">
										<div className="gdg-event-detail">
											<IoCalendarClearOutline className="gdg-event-icon" />
											<span>August 30, 2024</span>
										</div>
										<div className="gdg-event-detail">
											<IoTimeOutline className="gdg-event-icon" />
											<span>10:00 AM - 5:00 PM</span>
										</div>
										<div className="gdg-event-detail">
											<IoLocationOutline className="gdg-event-icon" />
											<span>Room 306</span>
										</div>
									</div>
									<p className="gdg-event-description">
										A creative UX workshop to explore modern design trends.
									</p>
									<button className="gdg-view-details-btn">View Details</button>
								</div>
							</div>

							<div className="gdg-event-card">
								<div className="gdg-event-image">
									<span className="gdg-event-type">Conference</span>
									<img src={project} alt="" />
								</div>
								<div className="gdg-event-content">
									<h3 className="gdg-event-title">UXplorer</h3>

									<div className="gdg-event-details">
										<div className="gdg-event-detail">
											<IoCalendarClearOutline className="gdg-event-icon" />
											<span>August 30, 2024</span>
										</div>
										<div className="gdg-event-detail">
											<IoTimeOutline className="gdg-event-icon" />
											<span>10:00 AM - 5:00 PM</span>
										</div>
										<div className="gdg-event-detail">
											<IoLocationOutline className="gdg-event-icon" />
											<span>Room 306</span>
										</div>
									</div>
									<p className="gdg-event-description">
										A creative UX workshop to explore modern design trends.
									</p>
									<button className="gdg-view-details-btn">View Details</button>
								</div>
							</div>
						</div>
					</section>
				</main>
				<footer>12</footer>
			</div>
		</>
	);
}

export default ProjectsPage;
