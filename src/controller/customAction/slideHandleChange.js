export const nextSlide = (photos, setCurrentSlide) => {
	setCurrentSlide((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
};

export const prevSlide = (photos, setCurrentSlide) => {
	setCurrentSlide((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
};

export const goToSlide = (setCurrentSlide, index) => {
	setCurrentSlide(index);
};

export const handleLoadMore = (loadGallery, setLoadGallery) => {
	if (loadGallery === 50) {
		setLoadGallery(10);
	} else {
		setLoadGallery(50);
	}
};
