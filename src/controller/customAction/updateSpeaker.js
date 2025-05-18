export const updateSpeaker = (event, speaker, setspeaker, setevent) => {
	const {
		ev_spindex,
		ev_spid = null,
		ev_spname = "",
		ev_spinfo = "",
		ev_spphotoURL = "",
	} = event;

	const copy = [...speaker];
	copy[ev_spindex] = {
		sp_id: ev_spid,
		sp_status: "Active",
		sp_name: ev_spname,
		sp_info: ev_spinfo,
		sp_photoURL: ev_spphotoURL,
	};

	setspeaker(copy);
	setevent((prevState) => ({
		...prevState,
		ev_spindex: null,
		ev_spid: null,
		ev_spname: "",
		ev_spinfo: "",
		ev_spphotoURL: "",
	}));
};
