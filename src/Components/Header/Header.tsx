import { combineWithTheme } from "../../utils";
import styles from "./Header.module.css";

type HeaderBackgroundType = "transparent" | "light" | "dark";

interface Props extends React.PropsWithChildren {
	background: HeaderBackgroundType;
}

const Header = ({ children, background }: Props) => {
	return (
		<header className={styles[combineWithTheme(background, "header")]}>
			<div className={styles.header}>{children}</div>
		</header>
	);
};

export default Header;
