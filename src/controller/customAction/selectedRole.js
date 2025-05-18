export const selectedRole = (index, role, setMember) => {
	setMember((prevEvent) => ({
		...prevEvent,
		me_roindex: index,
		me_roid: role[index].ro_id,
		me_roname: role[index].ro_name,
		me_roacadyear: role[index].ro_ayID + "|" + role[index].ro_acadyear,
		me_rotype: role[index].ro_type,
	}));
};
