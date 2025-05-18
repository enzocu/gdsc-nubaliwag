export const roleChange = (member, setRole, setMember, academicYear) => {
	setRole((prevState) => [
		...prevState,
		{
			ro_id: null,
			ro_ayID:
				member.me_roacadyear?.split("|")[0] ||
				(academicYear && academicYear.length > 0 ? academicYear[0].id : "") ||
				"",
			ro_status: "Active",
			ro_name: member.me_roname || "",
			ro_acadyear:
				member.me_roacadyear?.split("|")[1] ||
				(academicYear && academicYear.length > 0
					? academicYear[0].ay_academicyear
					: "") ||
				"",
			ro_type: member.me_rotype || "",
		},
	]);

	setMember((prevState) => ({
		...prevState,
		me_roacadyear: "",
		me_roname: "",
		me_rotype: "",
	}));
};
