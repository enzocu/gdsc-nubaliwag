export const organizerChange = (value, organizer, setOrganizer, setEvent) => {
	const val = value.split("|");
	const or_id = val[0];
	const or_name = val[1];

	const exists = organizer.some((item) => item.or_id === or_id);

	if (!exists) {
		setOrganizer((prevState) => [
			...prevState,
			{
				or_status: "Active",
				or_id: or_id,
				or_name: or_name,
			},
		]);
	}

	setEvent((prevState) => ({
		...prevState,
		ev_organizer: "",
	}));
};
