import "../App.css";
import { withDragAndDrop, Box, Header } from "../Components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCameraRetro, faImage, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useImage } from "../Context/ImageProvider";
import { ImageActionType } from "../Types";
import { useTheme } from "../Context/ThemeProvider";
import { combineWithTheme } from "../utils";
import { useTitle } from "../Hooks/useTitle";

const Home = () => {
	const { dispatch } = useImage();
	const navigate = useNavigate();
	const { theme, setTheme } = useTheme();

	useTitle("Photo Art");

	const handleFileChange = (files: FileList) => {
		if (!files || files.length <= 0) return;
		const file = files[0];
		const imageUrl = URL.createObjectURL(file);
		dispatch({ type: ImageActionType.SET, payload: { image: imageUrl, name: file.name } });
		navigate("/edit");
	};

	const DragAndDrop = withDragAndDrop(Box, handleFileChange);

	const switchTheme = () => {
		setTheme(prev => {
			if (prev === "dark") return "light";
			return "dark";
		});
	};

	return (
		<section id="Home">
			<div className="container">
				<Header background="transparent">
					<div></div>
					<div style={{ display: "flex", alignItems: "flex-end", gap: "10px" }}>
						<FontAwesomeIcon icon={faCameraRetro} size="3x" style={{ color: "white" }} />
						<h1 style={{ color: "white" }}>Photo Art!!</h1>
					</div>
					<div>
						<button onClick={switchTheme} className="btn btn-transparent">
							{theme === "dark" ? (
								<FontAwesomeIcon icon={faSun} size="2x" style={{ color: "white" }} />
							) : (
								<FontAwesomeIcon icon={faMoon} size="2x" style={{ color: "white" }} />
							)}
						</button>
					</div>
				</Header>
				<form className={`bg ${combineWithTheme(theme, "bg")}`}>
					<DragAndDrop>
						<span>Drag And Drop Files Here or Click</span>
						<FontAwesomeIcon icon={faImage} size="2x" />
					</DragAndDrop>
					<Box onClick={() => navigate("/new-picture")}>
						<span>Take New Picture</span>
						<FontAwesomeIcon icon={faCamera} size="2x" />
					</Box>
				</form>
			</div>
		</section>
	);
};

export default Home;
