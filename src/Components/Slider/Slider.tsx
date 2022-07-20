import React from "react";
import { useTheme } from "../../Context/ThemeProvider";
import { combineWithTheme } from "../../utils";
import styles from "./Slider.module.css";

interface Props {
	min: number;
	max: number;
	value: number;
	label: string;
	onChange: (value: number) => void;
}

const Slider = ({ min, max, value, label, onChange }: Props) => {
	const { theme } = useTheme();

	return (
		<div
			className={`${styles["slider-container"]} ${
				styles[combineWithTheme(theme, "slider-container")]
			}`}
		>
			<label htmlFor="input-range">{label}</label>
			<input
				className={`${styles.slider} ${styles[combineWithTheme(theme, "slider")]}`}
				type="range"
				id="input-range"
				min={min}
				max={max}
				value={value}
				step={1}
				onChange={e => onChange(parseInt(e.target.value, 10))}
			/>
			<span>{value}</span>
		</div>
	);
};

export default Slider;
