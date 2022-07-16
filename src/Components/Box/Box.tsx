import React from "react";
import styles from "./Box.module.css";
import { combineWithTheme } from "../../utils/index";
import { useTheme } from "../../Context/ThemeProvider";

interface Props extends React.PropsWithChildren {
	className?: string;
	onClick?: (e: React.MouseEvent) => void;
}

const Box = ({ children, className, onClick }: Props) => {
	const { theme } = useTheme();

	return (
		<div
			className={`${styles.box} ${styles[combineWithTheme(theme, "box")]} ${className}`}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

export default Box;
