import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function HeaderFormAdmin({ Title }) {
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	};

	return (
		<div className="header-form">
			<MdArrowBackIosNew
				className="icon"
				onClick={goBack}
				style={{ cursor: "pointer" }}
			/>
			<h3>{Title}</h3>
		</div>
	);
}

export default HeaderFormAdmin;
