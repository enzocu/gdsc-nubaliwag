export function openModal(id) {
	const modalEl = document.getElementById(id);

	if (modalEl) {
		const modal = new bootstrap.Modal(modalEl);
		modal.show();
	}
}

export function closeModal(id) {
	const modalEl = document.getElementById(id);
	if (modalEl) {
		const modalInstance = bootstrap.Modal.getInstance(modalEl);
		if (modalInstance) modalInstance.hide();
	}

	document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
	document.body.classList.remove("modal-open");
	document.body.style.overflow = "";
	document.body.style.paddingRight = "";
}

export function toggleDropdown(id) {
	const dropdownEl = document.getElementById(id);
	if (!dropdownEl) return;

	const toggleBtn = dropdownEl.previousElementSibling;
	if (!toggleBtn) return;

	let dropdownInstance = bootstrap.Dropdown.getInstance(toggleBtn);
	if (!dropdownInstance) {
		dropdownInstance = new bootstrap.Dropdown(toggleBtn);
	}

	dropdownInstance.toggle();
}
