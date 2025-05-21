import { NavLink, useLocation } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import logo from "../../assets/navlogo.png";
import { IoIosMenu } from "react-icons/io";
import { FiSun, FiMoon } from "react-icons/fi";

import {
	openModal,
	toggleNavbarCollapse,
} from "../../controller/customAction/showcloseModal";
import useTheme from "../../controller/customAction/useTheme";

function HeaderPage() {
	const location = useLocation();
	const { theme, toggleTheme } = useTheme();
	const isAdminRoute = location.pathname.startsWith("/gdsc-nubaliwag/admin");

	if (location.pathname == "/gdsc-nubaliwag/login") {
		openModal("loginModal");
	}
	return (
		<nav className="navbar navbar-expand-sm">
			<div className="container-fluid">
				<img src={logo} alt="GDSC Logo" className="logo-container" />

				{/* Hide navbar links on admin routes */}
				{!isAdminRoute && (
					<>
						<button
							className="navbar-toggler"
							type="button"
							onClick={() => toggleNavbarCollapse("collapsibleNavbar")}
						>
							<IoIosMenu className="icon" />
						</button>

						<div className="collapse navbar-collapse" id="collapsibleNavbar">
							<ul className="navbar-nav">
								<li className="nav-item">
									<NavLink
										to="/gdsc-nubaliwag/"
										end
										className={({ isActive }) => (isActive ? "active" : "")}
									>
										Home
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink
										to="/gdsc-nubaliwag/user/coreteam"
										end
										className={({ isActive }) => (isActive ? "active" : "")}
									>
										Members
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink
										to="/gdsc-nubaliwag/user/events"
										end
										className={({ isActive }) => (isActive ? "active" : "")}
									>
										Events
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink
										to="/gdsc-nubaliwag/user/projects"
										end
										className={({ isActive }) => (isActive ? "active" : "")}
									>
										Projects
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink
										to="/gdsc-nubaliwag/user/contact"
										end
										className={({ isActive }) => (isActive ? "active" : "")}
									>
										Contact
									</NavLink>
								</li>
							</ul>
							<div className="dark-mode" onClick={() => toggleTheme()}>
								{theme === "dark" ? <FiSun /> : <FiMoon />}
							</div>
						</div>
					</>
				)}
			</div>
		</nav>
	);
}

export default HeaderPage;
