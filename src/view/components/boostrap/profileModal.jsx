import React from "react";
import logo from "../../../assets/navlogo.png";
import "../../../style/bootstrapStyle/width.css";
import profileIcon from "../../../assets/profileicon.jpg";

const ProfileDetails = ({ profileDetails = null }) => {
	const hasData =
		profileDetails && profileDetails.user && profileDetails.user.us_studentID;

	if (!hasData) return null;

	return (
		<div
			className="modal fade"
			id="profileModal"
			tabIndex="-1"
			aria-labelledby="eventstatModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-lg profile">
				<section className="modal-content">
					<form>
						<div className="modal-header">
							<img src={logo} alt="GDSC Logo" className="logo-container" />
							<div className="header-details">
								<h4>Google Developer Groups on Campus</h4>
								<p>National University Baliwag</p>
							</div>
						</div>

						<div className="modal-body">
							<div className="core-member">
								<img
									src={profileDetails.user.us_photoURL || profileIcon}
									className="core-photo"
								/>
								<div className="core-info">
									<h3>
										{profileDetails.user.us_fname}{" "}
										{profileDetails.user.us_mname}{" "}
										{profileDetails.user.us_lname}
									</h3>
									<p className="member-position">
										{profileDetails.ro_name} |{" "}
										<span>
											{profileDetails.ro_type} {" A.Y "}
											{profileDetails.ro_acadyear}
										</span>
									</p>
									<div className="section-info">
										<label>Student ID</label>
										<p>{profileDetails.user.us_studentID}</p>
									</div>
									<div className="section-info">
										<label>Email</label>
										<p>{profileDetails.user.us_email}</p>
									</div>
								</div>
							</div>
						</div>
					</form>
				</section>
			</div>
		</div>
	);
};

export default ProfileDetails;
