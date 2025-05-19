import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAlert } from "../../context/alertProvider";
import { useAcadYear } from "../../context/acadyearContext";
import { useLoading } from "../../context/loadingProvider";

function EventsDetailsPage() {
	const location = useLocation();
	const { acadYear, loading } = useAcadYear();
	const { triggerAlert } = useAlert();
	const { setLoading, setPath } = useLoading();

	return (
		<>
			<div className="user-body member">
				<main>
					<section className="header-container">
						<div className="header-content">
							<h1>Events Details</h1>
							<p>
								Discover our upcoming and past events, workshops, and
								activities.
							</p>
						</div>
					</section>
				</main>
				<footer>12</footer>
			</div>
		</>
	);
}

export default EventsDetailsPage;
