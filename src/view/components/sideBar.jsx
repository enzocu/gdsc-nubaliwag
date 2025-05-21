import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";

import { IoCalendarClearOutline } from "react-icons/io5";
import { MdOutlinePeopleAlt, MdOutlineInsertPhoto } from "react-icons/md";
import { FiSun, FiMoon, FiUser, FiHelpCircle, FiLogOut } from "react-icons/fi";

import AccountSettings from "./boostrap/accountModal";

import useTheme from "../../controller/customAction/useTheme";
import { useAlert } from "../context/alertProvider";
import { openModal } from "../../controller/customAction/showcloseModal";
import { handleLogout } from "../../controller/firebase/handleLogout";

function SideBar() {
	const navigate = useNavigate();
	const { triggerAlert } = useAlert();
	const { theme, toggleTheme } = useTheme();

	return (
		<nav className="sidebar">
			<AccountSettings />
			<ul className="side-navigation">
				<li>
					<NavLink
						to="/gdsc-nubaliwag/admin/dashboard"
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						<RxDashboard /> Dashboard
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/gdsc-nubaliwag/admin/events"
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						<IoCalendarClearOutline /> Events
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/gdsc-nubaliwag/admin/members"
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						<MdOutlinePeopleAlt /> Core Members
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/gdsc-nubaliwag/admin/photos"
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

				<li onClick={() => openModal("accountModal")}>
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
