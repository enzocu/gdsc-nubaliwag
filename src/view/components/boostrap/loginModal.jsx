import React, { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../style/bootstrapStyle/login.css";
import logo from "../../../assets/navlogo.png";
import { useAlert } from "../../context/alertProvider";
import { handleLogin } from "../../../controller/firebase/handleLogin";

const LoginModal = () => {
	const navigate = useNavigate();
	const { triggerAlert } = useAlert();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		await handleLogin({
			email,
			password,
			setLoading,
			triggerAlert,
			navigate,
		});
	};

	return (
		<>
			<div className="modal fade" id="loginModal">
				<div className="modal-dialog modal-lg login">
					<section className="modal-content">
						<form onSubmit={handleSubmit}>
							<div className="modal-header">
								<img src={logo} alt="GDSC Logo" className="logo-container" />
								<div className="header-details">
									<h4>Google Developer Groups on Campus</h4>
									<p>National University Baliwag</p>
								</div>
							</div>

							<div className="modal-body">
								<div className="form-title">
									<h3>Login </h3>
									<p>Enter your credentials to access the admin panel.</p>
								</div>

								<div className="form-field">
									<label htmlFor="email" className="form-label">
										School Email
									</label>
									<input
										type="email"
										className="form-control"
										id="email"
										placeholder="@university.edu.ph"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>
								<div className="form-field">
									<label htmlFor="password" className="form-label">
										Password
									</label>
									<input
										type="password"
										className="form-control"
										id="password"
										placeholder="Enter your passcode"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</div>
								<a href="">Forgot password?</a>
							</div>

							<div className="modal-footer">
								<button type="submit" className="btn btn-primary">
									{loading ? (
										<span className="spinner-border spinner-border-sm"></span>
									) : (
										"Login"
									)}
								</button>
							</div>
						</form>
					</section>
					<section className="modal-image"></section>
				</div>
			</div>
		</>
	);
};

export default LoginModal;
