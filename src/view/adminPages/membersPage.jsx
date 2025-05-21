import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "../../style/adminStyle/members.css";
import profileIcon from "../../assets/profileicon.jpg";

import { MdAdd } from "react-icons/md";
import { BiSort } from "react-icons/bi";

import SideBar from "../../view/components/SideBar";
import HeaderPageAdmin from "../../view/components/headerPageAdmin";

import { useUser } from "../context/userContext";
import { useLoading } from "../context/loadingProvider";
import { useAlert } from "../context/alertProvider";

import { toggleDropdown } from "../../controller/customAction/showcloseModal";

import { getUsers } from "../../controller/firebase/get/getCoreMembers";
import { getAcademicYears } from "../../controller/firebase/get/getAcademicYears";

function MembersPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const { triggerAlert } = useAlert();
	const { user, userDetails, loading } = useUser();
	const { setLoading, setPath } = useLoading();

	const [search, setSearch] = useState(null);
	const [roType, setType] = useState(null);
	const [member, setMember] = useState([]);
	const [academicYear, setAcademicYear] = useState([]);
	const [acadyear, setAcadyear] = useState(null);

	useEffect(() => {
		if (!loading && user && userDetails) {
			setPath(location.pathname);
			getUsers(
				search == null || search == ""
					? acadyear == null
						? userDetails.us_ayID.id
						: acadyear
					: null,
				roType,
				search,
				setMember,
				setLoading,
				triggerAlert,
				500
			);
		}
	}, [loading, search, roType, acadyear]);

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
					<HeaderPageAdmin Title="Core Members" />
					<div className="content-page members">
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

							<NavLink to="/gdsc-nubaliwag/admin/members/membersform?action=add">
								<button className="btn btn-primary form-btn">
									<MdAdd />
									<span>Add Core Member</span>
								</button>
							</NavLink>
						</section>
						<section className="member-list">
							<table className="core-table">
								<thead>
									<tr>
										<th>Image</th>
										<th>
											Name <BiSort />
										</th>
										<th>Student Email</th>
										<th>Student ID</th>

										<th>
											Role <BiSort />
										</th>
										<th>
											Role Type <BiSort />
										</th>
										<th>Academic Year</th>
									</tr>
								</thead>
								<tbody>
									{member.length > 0 ? (
										member.map((item, index) => (
											<tr
												key={item.id || index}
												onClick={() =>
													navigate(
														`/gdsc-nubaliwag/admin/members/membersform?action=edit&id=${item.id}`
													)
												}
											>
												<td>
													<div className="profile-pic">
														<img
															src={item.us_photoURL || profileIcon}
															alt="Profile"
														/>
													</div>
												</td>
												<td>
													{" "}
													{item.us_fname || item.us_mname || item.us_lname
														? `${item.us_fname || ""} ${item.us_mname || ""} ${
																item.us_lname || ""
														  }`.trim()
														: "No name"}
												</td>
												<td>{item.us_email || "No email"}</td>
												<td>{item.us_studentID || "N/A"}</td>
												<td>{item.roles.ro_name || "N/A"}</td>
												<td>{item.roles.ro_type || "N/A"}</td>
												<td>{item.roles.ro_acadyear || "N/A"}</td>
											</tr>
										))
									) : (
										<tr>
											<td colSpan="7" className="text-center py-3">
												No records found.
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</section>
					</div>
				</main>
			</div>
		</>
	);
}

export default MembersPage;
