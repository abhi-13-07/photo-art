import { useState, useEffect, useMemo, useCallback } from "react";
import { Header, SideBar, Slider } from "../Components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useImage } from "../Context/ImageProvider";
import { useTheme } from "../Context/ThemeProvider";
import { FilterProperty } from "../Types";
import { combineWithTheme } from "../utils";
import { useNavigate } from "react-router-dom";

const DEFAULT_PROPERTIES: FilterProperty[] = [
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
		name: "Contrast",
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
	const [options, setOptions] = useState<FilterProperty[]>(DEFAULT_PROPERTIES);
	const [optionIndex, setOptionIndex] = useState<number>(0);
	const { state } = useImage();
	const { theme } = useTheme();
	const navigate = useNavigate();

	const selectedOption: FilterProperty = options[optionIndex];

	const { image, name } = state;

	useEffect(() => {
		document.title = name;
	}, [name]);

	const changeOption = (index: number) => {
		setOptionIndex(index);
	};

	const changeStyles = (value: number) => {
		setOptions(options => {
			return options.map((option, idx) => {
				if (idx !== optionIndex) return option;
				return { ...option, value: value };
			});
		});
	};

	const getStyles = useCallback(() => {
		let styles: any = { filter: "" };
		options.forEach(option => {
			styles.filter += `${option.property}(${option.value}${option.unit}) `;
		});

		return styles;
	}, [options]);

	const navigateBack = () => {
		navigate("/");
	};

	return (
		<section id="Edit">
			<Header background={theme === "dark" ? "dark" : "light"}>
				<button className="btn-borderless" onClick={navigateBack}>
					<FontAwesomeIcon icon={faArrowLeft} size="2x" />
				</button>
				<strong>{name}</strong>
				<button>Save</button>
			</Header>
			<div className={`workspace workspace-${theme}`}>
				<div className="edit-img-comtainer">
					<img src={image} alt={name} className="edit-img" style={getStyles()} />
				</div>
				<div>
					<SideBar options={options} onChange={changeOption} selected={optionIndex} />
				</div>
			</div>
			<div>
				<Slider
					min={selectedOption.range.min}
					max={selectedOption.range.max}
					value={selectedOption.value}
					label={selectedOption.name}
					onChange={changeStyles}
				/>
			</div>
		</section>
	);
};

export default Edit;
