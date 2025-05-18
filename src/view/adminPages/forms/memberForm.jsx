import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import "../../../style/adminStyle/members.css";

import HeaderFormAdmin from "../../../view/components/headerFormAdmin";

import { RxCross2 } from "react-icons/rx";

import { useAlert } from "../../context/alertProvider";
import { useUser } from "../../context/userContext";
import { useLoading } from "../../context/loadingProvider";

import { handleChange } from "../../../controller/customAction/handleChange";
import { roleChange } from "../../../controller/customAction/roleChange";
import { updateRole } from "../../../controller/customAction/updateRole";
import { selectedRole } from "../../../controller/customAction/selectedRole";
import { toggleStatus } from "../../../controller/customAction/toggleStatus";

import { insertUser } from "../../../controller/firebase/insert/insertUser";
import { updateUser } from "../../../controller/firebase/update/updateUser";
import { getMemberdetails } from "../../../controller/firebase/get/getMemberdetails";
import { getAcademicYears } from "../../../controller/firebase/get/getAcademicYears";

const defaultMember = {
	me_ayID: "",
	me_fname: "",
	me_mname: "",
	me_lname: "",
	me_suffix: "",
	me_studentID: "",
	me_email: "",
	me_photoURL:
		"https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/gdsc_jaCyFcF.jpg",
	me_roindex: null,
	me_roid: null,
	me_roname: "",
	me_roacadyear: "",
	me_rotype: "",
};

function MembersForm() {
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams] = useSearchParams();
	const action = searchParams.get("action");
	const id = searchParams.get("id");

	const { triggerAlert } = useAlert();
	const { user, userDetails, loading } = useUser();
	const { setLoading, setPath } = useLoading();
	const memberImageref = useRef(null);

	const [btnloading, setBtnloading] = useState(false);
	const [member, setMember] = useState(defaultMember);
	const [academicYear, setAcademicYear] = useState([]);
	const [role, setRole] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (action == "add") {
			if (!loading && user && userDetails) {
				insertUser(
					userDetails.us_ayID,
					member,
					role,
					triggerAlert,
					setBtnloading
				);
			}
		} else if (action == "edit" && id) {
			if (!loading && user && userDetails) {
				updateUser(
					userDetails.us_ayID,
					id,
					member,
					role,
					triggerAlert,
					setBtnloading
				);
			}
		}
	};

	useEffect(() => {
		if (action === "edit" && id) {
			setPath(location.pathname);
			const unsubscribe = getMemberdetails(
				id,
				triggerAlert,
				setLoading,
				setMember,
				setRole
			);

			return () => unsubscribe();
		}
	}, [id]);

	useEffect(() => {
		if (!loading && user && userDetails) {
			getAcademicYears(userDetails.us_ayID, setAcademicYear);
		}
	}, [loading]);

	const goBack = () => navigate(-1);
	return (
		<div className="admin-body form">
			<main>
				<HeaderFormAdmin Title="Add Core Member" />
				<form className="content-form members" onSubmit={handleSubmit}>
					<section className="form-group form-group-image">
						<label htmlFor="me_photoURL">Image</label>
						<input
							type="file"
							className="form-control"
							name="me_photoURL"
							ref={memberImageref}
							style={{ display: "none" }}
							onChange={(e) => handleChange(e, setMember)}
						/>
						<div
							className="form-image-container"
							onClick={() => memberImageref.current.click()}
						>
							<img src={member.me_photoURL} alt="Member Photo" />
						</div>
					</section>

					<section className="form-group form-group-details">
						<div className="form-subgroup form-subgroup-name">
							<label>Name</label>
							<div className="form-fields">
								{["me_fname", "me_mname", "me_lname", "me_suffix"].map(
									(field, idx) => (
										<input
											key={field}
											type="text"
											className="form-control"
											placeholder={
												["First", "Middle", "Last", "Suffix"][idx] + " Name"
											}
											name={field}
											value={member[field] || ""}
											onChange={(e) => handleChange(e, setMember)}
											required={field !== "me_suffix"}
										/>
									)
								)}
							</div>
						</div>

						{/* Contact Fields */}
						<div className="form-subgroup form-subgroup-contact">
							<div className="form-field">
								<label>Email</label>
								<input
									type="email"
									className="form-control"
									placeholder="Enter Email"
									name="me_email"
									value={member.me_email || ""}
									onChange={(e) => handleChange(e, setMember)}
									required
								/>
							</div>
							<div className="form-field">
								<label>Student ID</label>
								<input
									type="text"
									className="form-control"
									placeholder="Enter Student ID"
									name="me_studentID"
									value={member.me_studentID || ""}
									onChange={(e) => handleChange(e, setMember)}
									pattern="\d{4}-\d{6}"
									title="Format must be YYYY-###### (e.g., 2024-161417)"
									required
								/>
							</div>
						</div>

						{/* Role Fields */}
						<div className="form-subgroup form-subgroup-role">
							<label>Role Information</label>
							<div className="form-role-fields-wrapper">
								<div className="form-role-fields">
									<div className="form-field">
										<label>Role</label>
										<input
											type="text"
											className="form-control"
											placeholder="Enter Role"
											name="me_roname"
											value={member.me_roname || ""}
											onChange={(e) => handleChange(e, setMember)}
										/>
									</div>

									<div className="form-field">
										<label>Academic Year</label>
										<input
											type="text"
											className="form-control"
											placeholder="Academic Year"
											name="me_roacadyear"
											readOnly
											value={
												member.me_roacadyear
													? member.me_roacadyear.split("|")[1]
													: academicYear.length > 0
													? academicYear[0].ay_academicyear
													: ""
											}
										/>
									</div>

									<div className="form-field">
										<label>Role Type</label>
										<select
											className="form-control"
											name="me_rotype"
											value={member.me_rotype || ""}
											onChange={(e) => handleChange(e, setMember)}
										>
											<option value="">Select Role Type</option>
											<option value="Organization Lead">
												Organization Lead
											</option>
											<option value="Executive Board">Executive Board</option>
											<option value="Core Lead">Core Lead</option>
											<option value="Operations Department">
												Operations Department
											</option>
											<option value="Finance Department">
												Finance Department
											</option>
											<option value="Technology Department">
												Technology Department
											</option>
										</select>
									</div>
								</div>

								<div className="form-role-actions">
									<button
										type="button"
										className="form-btn form-btn-add"
										style={{
											color:
												!member.me_roname || !member.me_rotype
													? "gray"
													: "var(--bg-button-color)",
										}}
										disabled={!member.me_roname || !member.me_rotype}
										onClick={() => {
											if (!member.me_roname || !member.me_rotype) return;

											if (member.me_roindex == null && academicYear != null) {
												roleChange(member, setRole, setMember, academicYear);
											} else if (member.me_roindex != null) {
												updateRole(member, role, setRole, setMember);
											}
										}}
									>
										{member.me_roindex == null ? "Add Role" : "Update Role"}
									</button>
								</div>

								{role.length > 0 && (
									<div className="form-subgroup-role">
										<label>Added Role</label>
										<ul className="role-list">
											{role.map((item, index) => (
												<li
													key={index}
													onClick={() => selectedRole(index, role, setMember)}
													style={{
														display:
															item.ro_status === "Inactive" ? "none" : "flex",
													}}
												>
													<RxCross2
														className="icon"
														onClick={() =>
															toggleStatus(index, setRole, "ro_id", "ro_status")
														}
													/>
													<span>{`${item.ro_name} | ${item.ro_acadyear} | ${item.ro_type}`}</span>
												</li>
											))}
										</ul>
									</div>
								)}
							</div>
						</div>
					</section>
					<section className="form-group form-group-buttons">
						<button
							type="submit"
							className="btn form-btn form-btn btn-primary"
							disabled={role.length < 1}
						>
							{btnloading ? (
								<span className="spinner-border spinner-border-sm"></span>
							) : (
								"Save"
							)}{" "}
						</button>
						<button
							type="button"
							className="btn form-btn btn-outline-primary"
							onClick={goBack}
						>
							Cancel
						</button>
					</section>
				</form>
			</main>
		</div>
	);
}

export default MembersForm;
