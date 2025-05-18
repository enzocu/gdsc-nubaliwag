export const toggleStatus = (index, setState, idName, statName) => {
	setState((prevItems) => {
		const item = prevItems[index];

		if (idName != null && item[idName] != null) {
			return prevItems.map((item, i) =>
				i === index
					? {
							...item,
							[statName]: item[statName] === "Active" ? "Inactive" : "Active",
					  }
					: item
			);
		} else {
			return prevItems.filter((_, i) => i !== index);
		}
	});
};
