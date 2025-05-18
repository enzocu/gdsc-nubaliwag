export const selectedSpeaker = (index, speaker, setEvent) => {
	setEvent((prevEvent) => ({
		...prevEvent,
		ev_spindex: index,
		ev_spid: speaker[index].sp_id,
		ev_spname: speaker[index].sp_name,
		ev_spinfo: speaker[index].sp_info,
	}));
};
