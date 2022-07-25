import { FilterProperty } from "../../Types";
import styles from "./CarouselMenu.module.css";

interface Props {
	options: FilterProperty[];
	selected: number;
	onChange: (index: number) => void;
}

const CarouselMenu = ({ options, selected, onChange }: Props) => {
	return (
		<div className={styles["carousel-menu"]}>
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
