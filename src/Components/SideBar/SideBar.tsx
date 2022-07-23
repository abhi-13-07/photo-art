import { useTheme } from "../../Context/ThemeProvider";
import { FilterProperty } from "../../Types";
import { combineWithTheme } from "../../utils";
import styles from "./SideBar.module.css";

interface Props {
	options: FilterProperty[];
	onChange: (index: number) => void;
	selected: number;
}

const SideBar = ({ options, onChange, selected }: Props) => {
	const { theme } = useTheme();

	return (
		<nav className={`${styles.sidebar} ${styles[combineWithTheme(theme, "sidebar")]}`}>
			{options.map((option, index) => (
				<span
					key={index}
					className={`${selected === index && styles["active"]} ${styles["sidebar-item"]}`}
					onClick={() => onChange(index)}
				>
					{option.name}
				</span>
			))}
		</nav>
	);
};

export default SideBar;
