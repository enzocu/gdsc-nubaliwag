import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { IoCalendarClearOutline } from "react-icons/io5";
import { MdOutlinePeopleAlt, MdOutlineInsertPhoto } from "react-icons/md";
import { FiSun, FiMoon, FiUser, FiHelpCircle, FiLogOut } from "react-icons/fi";
import useTheme from "../../controller/customAction/useTheme";
import { handleLogout } from "../../controller/firebase/handleLogout";
import { useAlert } from "../context/alertProvider";

function SideBar() {
	const navigate = useNavigate();
	const { triggerAlert } = useAlert();
	const { theme, toggleTheme } = useTheme();

	return (
		<nav className="sidebar">
			<ul className="side-navigation">
				<li>
					<NavLink
						to="/admin/dashboard"
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						<RxDashboard /> Dashboard
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/admin/events"
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						<IoCalendarClearOutline /> Events
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/admin/members"
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						<MdOutlinePeopleAlt /> Core Members
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/admin/photos"
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						<MdOutlineInsertPhoto /> Photos
					</NavLink>
				</li>
			</ul>

			<ul className="side-menu">
				<li onClick={toggleTheme}>
					{theme === "dark" ? <FiSun /> : <FiMoon />} Switch to{" "}
					{theme === "dark" ? "Light" : "Dark"} Mode
				</li>

				<li href="https" data-bs-toggle="modal" data-bs-target="#profileModal">
					<FiUser /> My Account
				</li>

				<li onClick={() => handleLogout({ navigate, triggerAlert })}>
					<FiLogOut /> Log out
				</li>
			</ul>
		</nav>
	);
}

export default SideBar;
