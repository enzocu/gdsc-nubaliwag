import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/navlogo.png";
import { IoIosMenu } from "react-icons/io";
import { openModal } from "../../controller/customAction/showcloseModal";
import useTheme from "../../controller/customAction/useTheme";

function HeaderPage() {
	const location = useLocation();
	const { toggleTheme } = useTheme();
	const isAdminRoute = location.pathname.startsWith("/admin");

	return (
		<nav className="navbar navbar-expand-sm">
			<div className="container-fluid">
				<img
					src={logo}
					alt="GDSC Logo"
					className="logo-container"
					onClick={toggleTheme}
				/>

				{/* Hide navbar links on admin routes */}
				{!isAdminRoute && (
					<>
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapsibleNavbar"
						>
							<IoIosMenu />
						</button>

						<div className="collapse navbar-collapse" id="collapsibleNavbar">
							<ul className="navbar-nav">
								<li className="nav-item">
									<NavLink
										to="/"
										end
										className={({ isActive }) => (isActive ? "active" : "")}
									>
										Home
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink
										to="/user/coreteam"
										end
										className={({ isActive }) => (isActive ? "active" : "")}
									>
										Members
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink
										to="/user/events"
										end
										className={({ isActive }) => (isActive ? "active" : "")}
									>
										Events
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink
										to="/user/projects"
										end
										className={({ isActive }) => (isActive ? "active" : "")}
									>
										Projects
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink
										to="/user/contact"
										end
										className={({ isActive }) => (isActive ? "active" : "")}
									>
										Contact
									</NavLink>
								</li>
								<li className="nav-item">
									<a href="#" onClick={() => openModal("loginModal")}>
										Login
									</a>
								</li>
							</ul>
						</div>
					</>
				)}
			</div>
		</nav>
	);
}

export default HeaderPage;
