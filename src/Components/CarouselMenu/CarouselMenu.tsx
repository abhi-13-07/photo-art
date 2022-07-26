import { useTheme } from "../../Context/ThemeProvider";
import { FilterProperty } from "../../Types";
import { combineWithTheme } from "../../utils";
import styles from "./CarouselMenu.module.css";

interface Props {
	options: FilterProperty[];
	selected: number;
	onChange: (index: number) => void;
}

const CarouselMenu = ({ options, selected, onChange }: Props) => {
	const { theme } = useTheme();

	return (
		<div
			className={`${styles["carousel-menu"]} ${styles[combineWithTheme(theme, "carousel-menu")]}`}
		>
			{options.map((option, index) => (
				<span
					key={index}
					className={`${styles["carousel-menu-item"]} ${
						selected === index && styles["active-item"]
					}`}
					onClick={() => onChange(index)}
				>
					{option.name}
				</span>
			))}
		</div>
	);
};

export default CarouselMenu;
