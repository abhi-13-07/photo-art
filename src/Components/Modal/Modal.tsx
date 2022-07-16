import { useTheme } from "../../Context/ThemeProvider";
import { combineWithTheme } from "../../utils";
import styles from "./Modal.module.css";

const Modal = ({ children }: React.PropsWithChildren) => {
	const { theme } = useTheme();

	return (
		<div className={styles["modal-container"]}>
			<div className={`${styles["modal-body"]} ${styles[combineWithTheme(theme, "modal-body")]}`}>
				{children}
			</div>
		</div>
	);
};

export default Modal;
