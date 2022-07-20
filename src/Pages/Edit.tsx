import { useState, useEffect, useCallback, useRef } from "react";
import { Header, SideBar, Slider } from "../Components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useImage } from "../Context/ImageProvider";
import { useTheme } from "../Context/ThemeProvider";
import { FilterProperty } from "../Types";
import { useNavigate } from "react-router-dom";
import { createCanvas, downloadImage, drawImage } from "../utils";
import { useTitle } from "../Hooks/useTitle";

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
	const imgRef = useRef<HTMLImageElement>(null);
	const { state } = useImage();
	const { theme } = useTheme();
	const navigate = useNavigate();

	const selectedOption: FilterProperty = options[optionIndex];

	const { image, name } = state;

	useTitle(`${name} | Edit`);

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

	const savePhoto = () => {
		const img = document.createElement("img");
		img.src = image;
		const canvas = createCanvas(img.naturalHeight, img.naturalWidth);
		if (!imgRef) return;

		const filters = window.getComputedStyle(imgRef.current as Element).filter;
		const imgUrl = drawImage(img, canvas, { filter: filters });
		downloadImage(imgUrl, name);
	};

	return (
		<section id="Edit">
			<Header background={theme === "dark" ? "dark" : "light"}>
				<button className="btn btn-transparent" onClick={navigateBack}>
					<FontAwesomeIcon icon={faArrowLeft} size="2x" />
				</button>
				<strong>{name}</strong>
				<button className="btn btn-primary btn-fit" onClick={savePhoto}>
					<FontAwesomeIcon icon={faDownload} style={{ marginRight: "10px" }} />
					<span>Save</span>
				</button>
			</Header>
			<div className={`workspace workspace-${theme}`}>
				<div className="edit-img-comtainer">
					<img src={image} alt={name} className="edit-img" style={getStyles()} ref={imgRef} />
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
