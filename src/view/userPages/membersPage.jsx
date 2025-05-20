import { useState, useEffect } from "react";
import "../../style/userStyle/member.css";
import profileIcon from "../../assets/profileicon.jpg";
import Footer from "../components/footer";

import { useLocation } from "react-router-dom";
import { useAlert } from "../context/alertProvider";
import { useAcadYear } from "../context/acadyearContext";
import { useLoading } from "../context/loadingProvider";
import { getUserRoles } from "../../controller/firebase/get/getUserRoles";
import ProfileDetails from "../components/boostrap/profileModal";
import { openModal } from "../../controller/customAction/showcloseModal";
import UrlUpload from "../components/boostrap/urlModal";

function MembersPage() {
	const location = useLocation();
	const { acadYear, loading } = useAcadYear();
	const { triggerAlert } = useAlert();
	const { setLoading, setPath } = useLoading();

	const [member, setMember] = useState([]);
	const [profileDetails, setProfileDetails] = useState([]);

	useEffect(() => {
		if (!loading && acadYear) {
			setPath(location.pathname);
			getUserRoles(acadYear.id, setMember, setLoading, triggerAlert);
		}
	}, [loading, acadYear]);

	return (
		<>
			<UrlUpload />
			<ProfileDetails profileDetails={profileDetails} />
			<div className="user-body member">
				<main>
					<section className="header-container">
						<div className="header-content">
							<h1>Meet Our Members</h1>
							<p>Get to know the faces behind GDG On Campus NU Baliwag.</p>
						</div>
					</section>
					{member["Organization Lead"]?.length > 0 && (
						<section className="org-lead-section">
							<div className="section-container">
								<h2>Organization Lead</h2>
								<div className="org-lead-content">
									<div className="org-lead-info">
										<h3>
											{member["Organization Lead"][0].user.us_fname}{" "}
											{member["Organization Lead"][0].user.us_mname}{" "}
											{member["Organization Lead"][0].user.us_lname}
										</h3>
										<p className="member-position">Organization Lead</p>
										<p className="member-org">
											Google Developer Groups On Campus
										</p>
										<p className="member-school">National University Baliwag</p>
										<a
											className="view-profile"
											onClick={(e) => {
												e.preventDefault();
												setProfileDetails(member["Organization Lead"][0]);
												openModal("profileModal");
											}}
										>
											View Profile
										</a>
									</div>
									<img
										src={
											member["Organization Lead"][0].user.us_photoURL ||
											profileIcon
										}
										alt="org-lead-photo"
										className="org-lead-photo"
									/>
								</div>
							</div>
						</section>
					)}

					{renderMembers(
						"Executive Board",
						"Department leaders who coordinate and oversee specific areas of the organization",
						member["Executive Board"],
						setProfileDetails
					)}
					{renderMembers(
						"Core Leads",
						"Department leaders who coordinate and oversee specific areas of the organization",
						member["Core Lead"],
						setProfileDetails
					)}
					{renderMembers(
						"Operations Department",
						"Responsible for event planning, communications, and member engagement",
						member["Operations Department"],
						setProfileDetails
					)}
					{renderMembers(
						"Finance Department",
						"Manages budgeting and financial planning for the organization.",
						member["Finance Department"],
						setProfileDetails
					)}
					{renderMembers(
						"Technology Department",
						"Leads technical workshops, develops projects, and provides technical expertise.",
						member["Technology Department"],
						setProfileDetails
					)}
				</main>
				<Footer />
			</div>
		</>
	);
}

export default MembersPage;

const renderMembers = (title, description, membersList, setProfileDetails) => {
	if (!membersList || membersList.length === 0) return null;

	return (
		<section className="core-board-section">
			<div className="section-container">
				<h2>{title}</h2>
				{description && (
					<p className="section-description-member">{description}</p>
				)}
				<div className="core-board-grid">
					{membersList.map((member, index) => (
						<div className="core-member" key={index}>
							<img
								src={member.user.us_photoURL || profileIcon}
								className="core-photo"
							/>
							<div className="core-info">
								<h3>
									{member.user.us_fname} {member.user.us_mname}{" "}
									{member.user.us_lname}
								</h3>
								<p className="member-position">{member.ro_name}</p>
								<p className="member-org">Google Developer Groups On Campus</p>
								<p className="member-school">National University Baliwag</p>
								<a
									className="view-profile"
									onClick={(e) => {
										e.preventDefault();
										setProfileDetails(member);
										openModal("profileModal");
									}}
								>
									View Profile
								</a>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
