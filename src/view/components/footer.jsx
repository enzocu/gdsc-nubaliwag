import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import logo from "../../assets/navlogo.png";
import { RiFacebookCircleFill } from "react-icons/ri";
import { LuInstagram } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
	return (
		<footer className="footer">
			<section className="social-media">
				<div className="social-info">
					<img src={logo} alt="GDSC Logo" className="social-logo" />
					<div className="social-text">
						<h4>Google Developer Groups on Campus</h4>
						<p>National University Baliwag</p>
						<ul className="social-icons">
							<li>
								<RiFacebookCircleFill />
							</li>
							<li>
								<LuInstagram />
							</li>
							<li>
								<FaXTwitter />
							</li>
						</ul>
					</div>
				</div>
			</section>

			<section className="developer">
				<label className="section-title">Developer</label>
				<ul className="developer-list">
					<li className="developer-item">
						<h4 className="dev-name">Lawrence S. Cunanan</h4>
						<p className="dev-role">Web Development Lead</p>
					</li>
					<li className="developer-item">
						<h4 className="dev-name">Jolo Tadeo</h4>
						<p className="dev-role">Web Assistant</p>
					</li>
					<li className="developer-item">
						<h4 className="dev-name">Russel</h4>
						<p className="dev-role">Web Assistant</p>
					</li>
					<li className="developer-item">
						<h4 className="dev-name">Marcus Sanchez</h4>
						<p className="dev-role">UI/UX Lead</p>
					</li>
				</ul>
			</section>

			<section className="contact">
				<label className="section-title">Contact Us</label>
				<ul className="contact-list">
					<li className="contact-item">
						<MdOutlineMailOutline className="icon" />
						<div className="contact-info">
							<h4 className="contact-title">Email</h4>
							<p className="contact-detail">gdg.nubaliwag@gmail.com</p>
						</div>
					</li>

					<li className="contact-item">
						<LuPhone className="icon" />
						<div className="contact-info">
							<h4 className="contact-title">Phone</h4>
							<p className="contact-detail">+63 912 345 6789</p>
						</div>
					</li>
					<li className="contact-item">
						<IoLocationOutline className="icon" />
						<div className="contact-info">
							<h4 className="contact-title">Address</h4>
							<p className="contact-detail">
								National University - Baliwag Baliwag, Bulacan, Philippines
							</p>
						</div>
					</li>
				</ul>
			</section>
		</footer>
	);
};

export default Footer;
