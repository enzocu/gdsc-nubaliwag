export const galleryChange = (input, setGallery) => {
	let fileUrl;

	if (typeof input === "string" && input.trim() !== "") {
		fileUrl = input;
	} else if (input && input[0]) {
		fileUrl =
			"https://scontent.fcrk1-5.fna.fbcdn.net/v/t39.30808-6/481105501_122262345494006670_4394535082186623823_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHYtma2CYvKV9speVCXum5nx135iuAw2QfHXfmK4DDZBx2aeUcdrWfEQGNJmfhL0G1db87dpvrCvGp5f0bu0_Zp&_nc_ohc=aYMqEDEYcUkQ7kNvwFPB-Ui&_nc_oc=AdlsZclZIAAKBT6wcX3gxEkheOahL9mpYHdJuzXkdjDvWr2O29UXLiW--IoLeaA9F7E&_nc_zt=23&_nc_ht=scontent.fcrk1-5.fna&_nc_gid=0XdGZgWHG5wT4ezxDqetpg&oh=00_AfKsKPIuKv30kmIQo3PcozWTkp-G8d-ZDBojJLh-Mm9Eug&oe=682D6752";
	}

	setGallery((prevState) => [
		...prevState,
		{
			ga_id: null,
			ga_status: "Active",
			ga_photoURL: fileUrl,
		},
	]);
};
