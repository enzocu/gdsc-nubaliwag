import "../../style/userStyle/member.css";
import aboutUsImg from "../../assets/profileicon.jpg";
function MembersPage() {
	return (
		<>
			<div className="user-body member">
				<main>
					<section className="header-container">
						<div className="header-content">
							<h1>Meet Our Members</h1>
							<p>Get to know the faces behind GDG On Campus NU Baliwag.</p>
						</div>
					</section>
					<section className="org-lead-section">
						<div className="section-container">
							<h2>Organization Lead</h2>
							<div className="org-lead-content">
								<div className="org-lead-info">
									<h3>Clarenz C. Cruz</h3>
									<p className="member-position">Organization Lead</p>
									<p className="member-org">
										Google Developer Groups On Campus
									</p>
									<p className="member-school">National University Baliwag</p>
									<a href="#" className="view-profile">
										View Profile
									</a>
								</div>
								<img
									src={aboutUsImg}
									alt="org-lead-photo"
									className="org-lead-photo"
								></img>
							</div>
						</div>
					</section>

					{/* Executive Board */}
					<section className="core-board-section">
						<div className="section-container">
							<h2>Executive Board</h2>
							<p className="section-description-member">
								Department leaders who coordinate and oversee specific areas of
								the organization
							</p>
							<div className="core-board-grid">
								<div className="core-member">
									<img src={aboutUsImg} className="core-photo"></img>
									<div className="core-info">
										<h3>Mikhaela Ayesha DC. Espiritu</h3>
										<p className="member-position">Chief Executive Officer</p>
										<p className="member-org">
											Google Developer Groups On Campus
										</p>
										<p className="member-school">National University Baliwag</p>
										<a href="#" className="view-profile">
											View Profile
										</a>
									</div>
								</div>

								<div className="core-member">
									<img src={aboutUsImg} className="core-photo"></img>
									<div className="core-info">
										<h3>Mikhaela Ayesha DC. Espiritu</h3>
										<p className="member-position">Chief Executive Officer</p>
										<p className="member-org">
											Google Developer Groups On Campus
										</p>
										<p className="member-school">National University Baliwag</p>
										<a href="#" className="view-profile">
											View Profile
										</a>
									</div>
								</div>

								<div className="core-member">
									<img src={aboutUsImg} className="core-photo"></img>
									<div className="core-info">
										<h3>Mikhaela Ayesha DC. Espiritu</h3>
										<p className="member-position">Chief Executive Officer</p>
										<p className="member-org">
											Google Developer Groups On Campus
										</p>
										<p className="member-school">National University Baliwag</p>
										<a href="#" className="view-profile">
											View Profile
										</a>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* Core Leads */}
					<section className="core-board-section">
						<div className="section-container">
							<h2>Core Leads</h2>
							<p className="section-description-member">
								Department leaders who coordinate and oversee specific areas of
								the organization
							</p>
							<div className="core-board-grid">
								<div className="core-member">
									<img src={aboutUsImg} className="core-photo"></img>
									<div className="core-info">
										<h3>Mikhaela Ayesha DC. Espiritu</h3>
										<p className="member-position">Chief Executive Officer</p>
										<p className="member-org">
											Google Developer Groups On Campus
										</p>
										<p className="member-school">National University Baliwag</p>
										<a href="#" className="view-profile">
											View Profile
										</a>
									</div>
								</div>

								<div className="core-member">
									<img src={aboutUsImg} className="core-photo"></img>
									<div className="core-info">
										<h3>Mikhaela Ayesha DC. Espiritu</h3>
										<p className="member-position">Chief Executive Officer</p>
										<p className="member-org">
											Google Developer Groups On Campus
										</p>
										<p className="member-school">National University Baliwag</p>
										<a href="#" className="view-profile">
											View Profile
										</a>
									</div>
								</div>

								<div className="core-member">
									<img src={aboutUsImg} className="core-photo"></img>
									<div className="core-info">
										<h3>Mikhaela Ayesha DC. Espiritu</h3>
										<p className="member-position">Chief Executive Officer</p>
										<p className="member-org">
											Google Developer Groups On Campus
										</p>
										<p className="member-school">National University Baliwag</p>
										<a href="#" className="view-profile">
											View Profile
										</a>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* Operations Department */}
					<section className="core-board-section">
						<div className="section-container">
							<h2>Operations Department</h2>
							<p className="section-description-member">
								Responsible for event planning, communications, and member
								engagement
							</p>
							<div className="core-board-grid">
								<div className="core-member">
									<img src={aboutUsImg} className="core-photo"></img>
									<div className="core-info">
										<h3>Mikhaela Ayesha DC. Espiritu</h3>
										<p className="member-position">Chief Executive Officer</p>
										<p className="member-org">
											Google Developer Groups On Campus
										</p>
										<p className="member-school">National University Baliwag</p>
										<a href="#" className="view-profile">
											View Profile
										</a>
									</div>
								</div>

								<div className="core-member">
									<img src={aboutUsImg} className="core-photo"></img>
									<div className="core-info">
										<h3>Mikhaela Ayesha DC. Espiritu</h3>
										<p className="member-position">Chief Executive Officer</p>
										<p className="member-org">
											Google Developer Groups On Campus
										</p>
										<p className="member-school">National University Baliwag</p>
										<a href="#" className="view-profile">
											View Profile
										</a>
									</div>
								</div>

								<div className="core-member">
									<img src={aboutUsImg} className="core-photo"></img>
									<div className="core-info">
										<h3>Mikhaela Ayesha DC. Espiritu</h3>
										<p className="member-position">Chief Executive Officer</p>
										<p className="member-org">
											Google Developer Groups On Campus
										</p>
										<p className="member-school">National University Baliwag</p>
										<a href="#" className="view-profile">
											View Profile
										</a>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* FInance  Department */}
					<section className="core-board-section">
						<div className="section-container">
							<h2>Finance Department</h2>
							<p className="section-description-member">
								Manages budgeting and financial planning for the organization.
							</p>
							<div className="core-board-grid">
								<div className="core-member">
									<img src={aboutUsImg} className="core-photo"></img>
									<div className="core-info">
										<h3>Mikhaela Ayesha DC. Espiritu</h3>
										<p className="member-position">Chief Executive Officer</p>
										<p className="member-org">
											Google Developer Groups On Campus
										</p>
										<p className="member-school">National University Baliwag</p>
										<a href="#" className="view-profile">
											View Profile
										</a>
									</div>
								</div>

								<div className="core-member">
									<img src={aboutUsImg} className="core-photo"></img>
									<div className="core-info">
										<h3>Mikhaela Ayesha DC. Espiritu</h3>
										<p className="member-position">Chief Executive Officer</p>
										<p className="member-org">
											Google Developer Groups On Campus
										</p>
										<p className="member-school">National University Baliwag</p>
										<a href="#" className="view-profile">
											View Profile
										</a>
									</div>
								</div>

								<div className="core-member">
									<img src={aboutUsImg} className="core-photo"></img>
									<div className="core-info">
										<h3>Mikhaela Ayesha DC. Espiritu</h3>
										<p className="member-position">Chief Executive Officer</p>
										<p className="member-org">
											Google Developer Groups On Campus
										</p>
										<p className="member-school">National University Baliwag</p>
										<a href="#" className="view-profile">
											View Profile
										</a>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* Technology Department */}
					<section className="core-board-section">
						<div className="section-container">
							<h2>Technology Department</h2>
							<p className="section-description-member">
								Leads technical workshops, develops projects, and provides
								technical expertise.
							</p>
							<div className="core-board-grid">
								<div className="core-member">
									<img src={aboutUsImg} className="core-photo"></img>
									<div className="core-info">
										<h3>Mikhaela Ayesha DC. Espiritu</h3>
										<p className="member-position">Chief Executive Officer</p>
										<p className="member-org">
											Google Developer Groups On Campus
										</p>
										<p className="member-school">National University Baliwag</p>
										<a href="#" className="view-profile">
											View Profile
										</a>
									</div>
								</div>

								<div className="core-member">
									<img src={aboutUsImg} className="core-photo"></img>
									<div className="core-info">
										<h3>Mikhaela Ayesha DC. Espiritu</h3>
										<p className="member-position">Chief Executive Officer</p>
										<p className="member-org">
											Google Developer Groups On Campus
										</p>
										<p className="member-school">National University Baliwag</p>
										<a href="#" className="view-profile">
											View Profile
										</a>
									</div>
								</div>

								<div className="core-member">
									<img src={aboutUsImg} className="core-photo"></img>
									<div className="core-info">
										<h3>Mikhaela Ayesha DC. Espiritu</h3>
										<p className="member-position">Chief Executive Officer</p>
										<p className="member-org">
											Google Developer Groups On Campus
										</p>
										<p className="member-school">National University Baliwag</p>
										<a href="#" className="view-profile">
											View Profile
										</a>
									</div>
								</div>
							</div>
						</div>
					</section>
				</main>
				<footer>12</footer>
			</div>
		</>
	);
}

export default MembersPage;
