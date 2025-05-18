import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import "../../../style/adminStyle/dashboard.css";

import HeaderFormAdmin from "../../../view/components/headerFormAdmin";

import { useAlert } from "../../context/alertProvider";
import { useUser } from "../../context/userContext";
import { useLoading } from "../../context/loadingProvider";

import { handleChange } from "../../../controller/customAction/handleChange";

import { insertAcademicYear } from "../../../controller/firebase/insert/insertAcademicYear";
import { getAcademicYearDetails } from "../../../controller/firebase/get/getAcademicYearDetails";
import { updateAcademicYear } from "../../../controller/firebase/update/updateAcademicYear";

const defaultDashboard = {
	ay_bannerURL:
		"https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/gdsc_jaCyFcF.jpg",
	ay_academicyear: "",
	ay_about: "",
	ay_photoURL:
		"https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/gdsc_jaCyFcF.jpg",
};

function DashboardForm() {
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams] = useSearchParams();
	const action = searchParams.get("action");

	const { triggerAlert } = useAlert();
	const { user, userDetails, loading } = useUser();
	const { setLoading, setPath } = useLoading();
	const acadImageref = useRef(null);
	const bannerImageref = useRef(null);
	const eventImageref = useRef(null);

	const [btnloading, setBtnloading] = useState(false);
	const [acadyear, setAcadyear] = useState(defaultDashboard);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (action == "add") {
			if (!loading && user && userDetails) {
				insertAcademicYear(
					userDetails.uid,
					acadyear,
					setBtnloading,
					triggerAlert
				);
			}
		} else if (action == "edit") {
			if (!loading && user && userDetails) {
				updateAcademicYear(
					userDetails.us_ayID,
					acadyear,
					setBtnloading,
					triggerAlert
				);
			}
		}
	};

	useEffect(() => {
		if (action === "add") {
			const currentYear = new Date().getFullYear();
			const expectedAY = `${currentYear}-${currentYear + 1}`;
			setAcadyear((prev) => ({
				...prev,
				ay_academicyear: expectedAY,
			}));
		}

		if (action === "edit" && userDetails) {
			setPath(location.pathname);
			const unsubscribe = getAcademicYearDetails(
				userDetails.us_ayID,
				setAcadyear,
				setLoading,
				triggerAlert
			);

			return () => unsubscribe();
		}
	}, [loading, userDetails]);

	const goBack = () => navigate(-1);

	return (
		<div className="admin-body form">
			<main>
				<HeaderFormAdmin Title="Add New Academic Year" />
				<form className="content-form dashboard" onSubmit={handleSubmit}>
					<section className="form-banner-group">
						<img
							src={
								acadyear.ay_bannerURL instanceof File
									? URL.createObjectURL(acadyear.ay_bannerURL)
									: acadyear.ay_bannerURL
							}
							alt="Event Banner"
						/>
						<button
							type="button"
							className="form-btn"
							onClick={() => bannerImageref.current.click()}
						>
							Edit Banner Photo
							<input
								type="file"
								className="form-control"
								name="ay_bannerURL"
								ref={bannerImageref}
								style={{ display: "none" }}
								onChange={(e) => handleChange(e, setAcadyear)}
							/>
						</button>
					</section>
					<h1>A.Y {acadyear.ay_academicyear}</h1>
					<section className="form-section">
						<div className="form-field">
							<label>About</label>
							<textarea
								className="form-control"
								placeholder="Brief description about the event"
								name="ay_about"
								rows={7}
								value={acadyear.ay_about}
								onChange={(e) => handleChange(e, setAcadyear)}
								required
							></textarea>
						</div>

						<div className="form-group-image">
							<label>Image</label>
							<input
								type="file"
								className="form-control"
								name="ay_photoURL"
								ref={acadImageref}
								style={{ display: "none" }}
								onChange={(e) => handleChange(e, setAcadyear)}
							/>
							<div
								className="form-image-container"
								onClick={() => acadImageref.current.click()}
							>
								<img
									src={
										acadyear.ay_photoURL instanceof File
											? URL.createObjectURL(acadyear.ay_photoURL)
											: acadyear.ay_photoURL
									}
									alt="Preview"
								/>
							</div>
						</div>
					</section>
					<section className="form-group form-group-buttons">
						<button type="submit" className="btn form-btn form-btn btn-primary">
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

export default DashboardForm;
