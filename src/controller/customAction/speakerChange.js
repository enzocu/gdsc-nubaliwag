export const speakerChange = (event, setSpeaker, setEvent) => {
	setSpeaker((prevState) => [
		...prevState,
		{
			sp_id: null,
			sp_status: "Active",
			sp_name: event.ev_spname,
			sp_info: event.ev_spinfo,
			sp_photoURL: event.ev_spphotoURL,
		},
	]);

	setEvent((prevState) => ({
		...prevState,
		ev_spname: "",
		ev_spinfo: "",
		ev_spphotoURL: "",
	}));
};
