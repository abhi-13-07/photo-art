import styles from "./Modal.module.css";

const Modal = ({ children }: React.PropsWithChildren) => {
	return (
		<div className={styles["modal-container"]}>
			<div className={styles["modal-body"]}>{children}</div>
		</div>
	);
};

export default Modal;
