import { useState, useEffect } from "react";
import { Header } from "../Components";
import { useImage } from "../Context/ImageProvider";
import { useTheme } from "../Context/ThemeProvider";
import { combineWithTheme } from "../utils";

interface FilterProperties {
	name: string;
	property: string;
	value: number;
	range: { min: number; max: number };
	unit: string;
}

const DEFAULT_PROPERTIES: FilterProperties[] = [
	{
		name: "Brightness",
		property: "brightness",
		value: 100,
		range: {
			min: 0,
			max: 200
		},
		unit: "%"
	},
	{
		name: "Brightness",
		property: "contrast",
		value: 100,
		range: {
			min: 0,
			max: 200
		},
		unit: "%"
	},
	{
		name: "Saturation",
		property: "saturate",
		value: 100,
		range: {
			min: 0,
			max: 200
		},
		unit: "%"
	},
	{
		name: "Sepia",
		property: "sepia",
		value: 0,
		range: {
			min: 0,
			max: 100
		},
		unit: "%"
	},
	{
		name: "Hue Rotate",
		property: "hue-rotate",
		value: 0,
		range: {
			min: 0,
			max: 360
		},
		unit: "deg"
	},
	{
		name: "Blur",
		property: "blur",
		value: 0,
		range: {
			min: 0,
			max: 20
		},
		unit: "px"
	}
];

const Edit = () => {
	const [options, setOptions] = useState<FilterProperties[]>(DEFAULT_PROPERTIES);
	const { state } = useImage();
	const { theme } = useTheme();

	const { image, name } = state;

	useEffect(() => {
		document.title = name;
	}, [name]);

	return (
		<section id={combineWithTheme(theme, "Edit")}>
			<Header background={theme === "dark" ? "dark" : "light"}>
				<strong>{name}</strong>
				<button>Save</button>
			</Header>
			<div className="edit-img-comtainer">
				<img src={image} alt={name} className="edit-img" />
			</div>
		</section>
	);
};

export default Edit;
