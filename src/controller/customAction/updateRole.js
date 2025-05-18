export const updateRole = (member, role, setRole, setMember) => {
	const {
		me_roindex,
		me_roid = null,
		me_roname = "",
		me_roacadyear = "",
		me_rotype = "",
	} = member;

	const [ro_ayID, ro_acadyear] = me_roacadyear
		? me_roacadyear.split("|")
		: ["", ""];

	const copy = [...role];
	copy[me_roindex] = {
		ro_id: me_roid,
		ro_ayID: ro_ayID,
		ro_status: "Active",
		ro_name: me_roname,
		ro_acadyear: ro_acadyear,
		ro_type: me_rotype,
	};

	setRole(copy);
	setMember((prevState) => ({
		...prevState,
		me_roindex: null,
		me_roid: null,
		me_roname: "",
		me_roacadyear: "",
		me_rotype: "",
	}));
};
