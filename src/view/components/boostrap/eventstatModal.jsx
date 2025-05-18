import React, { useState } from "react";
import logo from "../../../assets/navlogo.png";
import { useAlert } from "../../context/alertProvider";
import { updateEventStatus } from "../../../controller/firebase/update/updateEventstatus";

const EventStatus = ({ eventId }) => {
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState("");
	const { triggerAlert } = useAlert();

	const handleSubmit = (e) => {
		e.preventDefault();
		updateEventStatus(eventId, status, triggerAlert, setLoading);
	};

	return (
		<div
			className="modal fade"
			id="eventstatModal"
			tabIndex="-1"
			aria-labelledby="eventstatModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-lg eventstatus">
				<section className="modal-content">
					<form onSubmit={handleSubmit}>
						<div className="modal-header">
							<img src={logo} alt="GDSC Logo" className="logo-container" />
							<div className="header-details">
								<h4>Google Developer Groups on Campus</h4>
								<p>National University Baliwag</p>
							</div>
						</div>

						<div className="modal-body">
							<div className="form-field">
								<label htmlFor="ev_status" className="form-label">
									Event Status
								</label>
								<select
									className="form-control"
									name="ev_status"
									value={status}
									onChange={(e) => setStatus(e.target.value)}
									required
								>
									<option value="">Select Type</option>
									<option value="Upcoming">Upcoming</option>
									<option value="Completed">Completed</option>
									<option value="Archived">Archive</option>
								</select>
							</div>
						</div>

						<div className="modal-footer">
							<button
								type="submit"
								className="btn btn-primary"
								disabled={loading}
							>
								{loading ? (
									<span className="spinner-border spinner-border-sm"></span>
								) : (
									"Update status"
								)}
							</button>
						</div>
					</form>
				</section>
			</div>
		</div>
	);
};

export default EventStatus;
