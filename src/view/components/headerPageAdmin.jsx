import { FiEdit } from "react-icons/fi";
import { NavLink } from "react-router-dom";

function HeaderPageAdmin({ Title, handleAdd = null }) {
	return (
		<div className="header-page">
			<h1>{Title}</h1>

			{Title === "Dashboard" && (
				<div style={{ display: "flex", gap: "15px" }}>
					<NavLink to="">
						<button className="btn btn-primary " onClick={handleAdd}>
							<FiEdit className="me-1" />
							Add A.Y
						</button>
					</NavLink>

					<NavLink to="/gdsc-nubaliwag/admin/dashboard/dashboardform?action=edit">
						<button className="btn btn-outline">
							<FiEdit className="me-1" />
							Edit Current A.Y
						</button>
					</NavLink>
				</div>
			)}
		</div>
	);
}

export default HeaderPageAdmin;
