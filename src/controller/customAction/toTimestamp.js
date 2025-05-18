export const toTimestamp = (Timestamp, dateStr, timeStr) => {
	if (!dateStr || !timeStr) return null;
	const datetimeStr = `${dateStr}T${timeStr}:00`;
	const date = new Date(datetimeStr);
	return isNaN(date.getTime()) ? null : Timestamp.fromDate(date);
};

export const formatDate = (dateString) => {
	if (!dateString) return "";
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "2-digit",
		year: "numeric",
	});
};

export const formatTime = (timeString) => {
	if (!timeString) return "";
	const [hour, minute] = timeString.split(":");
	const date = new Date();
	date.setHours(parseInt(hour), parseInt(minute));
	return date
		.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		})
		.toLowerCase();
};
