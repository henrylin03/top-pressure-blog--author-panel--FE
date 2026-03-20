import { createTheme } from "@mantine/core";

const COLOURS = {
	primary: "#3895a0",
	secondary: "#111f30",
	black: "#09101a",
};

export const theme = createTheme({
	primaryColor: "cyan",
	black: COLOURS.black,
	defaultRadius: "md",
	fontFamily: "Outfit, Calibri, Arial, sans-serif",
	headings: {
		fontFamily: "Corben, Calibri, Arial, sans-serif",
		fontWeight: "400",
		textWrap: "balance",
	},
});
