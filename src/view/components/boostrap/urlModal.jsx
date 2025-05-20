import React, { useState } from "react";
import logo from "../../../assets/navlogo.png";
import { useAlert } from "../../context/alertProvider";
import "../../../style/bootstrapStyle/width.css";
import { closeModal } from "../../../controller/customAction/showcloseModal";

const UrlUpload = ({ name = null, state = null, setState = null }) => {
	const { triggerAlert } = useAlert();
	const [urlImage, setUrlImage] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!urlImage.trim()) {
			triggerAlert("danger", "Please enter a valid URL.");
			return;
		}

		if (name != null) {
			setState((prev) => ({ ...prev, [name]: urlImage }));
		} else {
			state(urlImage, setState);
		}

		triggerAlert("success", "Image URL uploaded successfully!");
		closeModal("urlModal");
		// Reset input
		setUrlImage("");
	};

	return (
		<div
			className="modal fade"
			id="urlModal"
			tabIndex="-1"
			aria-labelledby="urlModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-lg url-upload">
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
							<div className="form-field">
								<label htmlFor="urlImage" className="form-label">
									Image URL
								</label>
								<input
									type="url"
									className="form-control"
									name="urlImage"
									value={urlImage}
									onChange={(e) => setUrlImage(e.target.value)}
									placeholder="https://example.com"
									required
								/>
							</div>
						</div>

						<div className="modal-footer">
							<button type="submit" className="btn btn-primary">
								Upload URL
							</button>
						</div>
					</form>
				</section>
			</div>
		</div>
	);
};

export default UrlUpload;
