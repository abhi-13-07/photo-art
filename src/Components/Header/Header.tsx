import { faCameraRetro, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "../../Context/ThemeProvider";
import styles from "./Header.module.css";

const Header = () => {
	const { theme, setTheme } = useTheme();

	const switchTheme = () => {
		setTheme(prev => {
			if (prev === "dark") return "light";
			return "dark";
		});
	};

	return (
		<header>
			<div className={styles.header}>
				<div></div>
				<div style={{ display: "flex", alignItems: "flex-end", gap: "10px" }}>
					<FontAwesomeIcon icon={faCameraRetro} size="3x" />
					<h1>Photo Art</h1>
				</div>
				<div>
					<button onClick={switchTheme}>
						{theme === "dark" ? (
							<FontAwesomeIcon icon={faSun} size="2x" />
						) : (
							<FontAwesomeIcon icon={faMoon} size="2x" />
						)}
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
