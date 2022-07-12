import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Header.module.css";

const Header = () => {
	return (
		<header>
			<div className={styles.header}>
				<FontAwesomeIcon icon={faCameraRetro} size="3x" />
				<h1>Photo Art</h1>
			</div>
		</header>
	);
};

export default Header;
