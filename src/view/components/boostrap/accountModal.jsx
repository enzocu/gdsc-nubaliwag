import React, { useState } from "react";
import logo from "../../../assets/navlogo.png";
import { useAlert } from "../../context/alertProvider";
import "../../../style/bootstrapStyle/width.css";

import { resetUserPassword } from "../../../controller/firebase/update/resetPassword";
import { updateUserEmail } from "../../../controller/firebase/update/updateEmail";

const AccountSettings = () => {
	const { triggerAlert } = useAlert();
	const [activeTab, setActiveTab] = useState("email");
	const [loading, setLoading] = useState(false);
	const [newEmail, setNewEmail] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (activeTab === "email") {
			await updateUserEmail(newEmail, triggerAlert, setLoading);
		} else if (activeTab === "password") {
			await resetUserPassword(triggerAlert, setLoading);
		}
	};

	return (
		<div
			className="modal fade"
			id="accountModal"
			tabIndex="-1"
			aria-labelledby="accountSettings"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-lg account">
				<section className="modal-content">
					<form onSubmit={handleSubmit}>
						<div className="modal-header">
							<img src={logo} alt="GDSC Logo" className="logo-container" />
							<div className="header-details">
								<h4>Google Developer Groups on Campus</h4>
								<p>National University Baliwag</p>
							</div>
						</div>

						{/* Bootstrap Tab Bar */}
						<ul className="nav nav-tabs nav-justified mt-4" role="tablist">
							<li className="nav-item" role="presentation">
								<button
									className={`nav-link ${
										activeTab === "email" ? "active" : ""
									}`}
									onClick={() => setActiveTab("email")}
									type="button"
								>
									Change Email
								</button>
							</li>
							<li className="nav-item" role="presentation">
								<button
									className={`nav-link ${
										activeTab === "password" ? "active" : ""
									}`}
									onClick={() => setActiveTab("password")}
									type="button"
								>
									Reset Password
								</button>
							</li>
						</ul>

						{/* Tab Content */}
						<div className="modal-body">
							{activeTab === "email" && (
								<div className="form-field">
									<label htmlFor="us_email" className="form-label">
										Change Super Admin Email
									</label>
									<input
										type="email"
										className="form-control"
										name="us_email"
										placeholder="@university.edu.ph"
										required
										value={newEmail}
										onChange={(e) => setNewEmail(e.target.value)}
									/>
								</div>
							)}

							{activeTab === "password" && (
								<div className="form-title">
									<h3>Reset Super Admin Password</h3>
									<p>Check your email and complete the setup.</p>
								</div>
							)}
						</div>

						<div className="modal-footer">
							<button type="submit" className="btn btn-primary">
								{loading ? (
									<span className="spinner-border spinner-border-sm"></span>
								) : activeTab == "email" ? (
									"Change"
								) : (
									"Reset"
								)}
							</button>
						</div>
					</form>
				</section>
			</div>
		</div>
	);
};

export default AccountSettings;
