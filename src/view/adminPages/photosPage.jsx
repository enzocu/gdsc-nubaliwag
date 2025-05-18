import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../../style/adminStyle/photos.css";
import uxplorer from "../../assets/uxplorer.png";

import { MdAdd } from "react-icons/md";

import SideBar from "../components/SideBar";
import HeaderPageAdmin from "../components/headerPageAdmin";

import { useUser } from "../context/userContext";
import { useLoading } from "../context/loadingProvider";
import { useAlert } from "../context/alertProvider";

import { toggleDropdown } from "../../controller/customAction/showcloseModal";

import { getAcademicYears } from "../../controller/firebase/get/getAcademicYears";
import getPhotos from "../../controller/firebase/get/getPhotos";

function PhotosPage() {
	const location = useLocation();

	const { user, userDetails, loading } = useUser();
	const { triggerAlert } = useAlert();
	const { setLoading, setPath } = useLoading();

	const [search, setSearch] = useState(null);
	const [photo, setPhoto] = useState([]);
	const [academicYear, setAcademicYear] = useState([]);
	const [acadyear, setAcadyear] = useState(null);

	useEffect(() => {
		if (!loading && user && userDetails) {
			setPath(location.pathname);

			getPhotos(
				search == null || search == ""
					? acadyear == null
						? userDetails.us_ayID.id
						: acadyear
					: null,
				search,
				setPhoto,
				setLoading,
				triggerAlert,
				500
			);
		}
	}, [loading, search, acadyear]);

	useEffect(() => {
		if (!loading && user && userDetails) {
			getAcademicYears(null, setAcademicYear);
		}
	}, [loading]);
	return (
		<>
			<div className="admin-body">
				<SideBar />
				<main>
					<HeaderPageAdmin Title="Photos" />
					<div className="content-page photos">
						<section className="function-container">
							<div className="filter-group">
								<div className="input-group ">
									<input
										type="text"
										className="form-control"
										placeholder="Search"
										value={search || ""}
										onChange={(e) => setSearch(e.target.value)}
									/>

									<button
										type="button"
										className="btn btn-outline-primary dropdown-toggle form-btn"
										data-bs-toggle="dropdown"
										onClick={() => toggleDropdown("acadyear")}
									>
										Academic Year
									</button>
									<ul className="dropdown-menu form-menu" id="acadyear">
										{academicYear.map((item) => (
											<li
												className="dropdown-item"
												key={item.id}
												onClick={() => {
													setAcadyear(item.id);
													toggleDropdown("acadyear");
												}}
											>{`A.Y ${item.ay_academicyear}`}</li>
										))}
									</ul>
								</div>
							</div>

							<NavLink to="/admin/photos/photosform?action=add">
								<button className="btn btn-primary form-btn">
									<MdAdd />
									<span>Add Photo</span>
								</button>
							</NavLink>
						</section>
						<section className="photos-list">
							{photo.length === 0 ? (
								<p className="no-records-message">No photos found.</p>
							) : (
								photo.map((ph) => (
									<NavLink
										key={ph.id}
										to={`/admin/photos/photosform?action=edit&id=${ph.id}`}
									>
										<div className="photos-card">
											<div className="photos-photo">
												<img
													src={ph.ph_photoURL || uxplorer}
													alt={ph.ph_name || "Photo"}
												/>
											</div>
											<div className="details">
												<h4>{ph.ph_name || "Untitled"}</h4>
												<p>
													{ph.ph_date
														? new Date(
																ph.ph_date.seconds * 1000
														  ).toLocaleDateString(undefined, {
																year: "numeric",
																month: "short",
																day: "numeric",
														  })
														: "Date N/A"}
												</p>
											</div>
										</div>
									</NavLink>
								))
							)}
						</section>
					</div>
				</main>
			</div>
		</>
	);
}

export default PhotosPage;
