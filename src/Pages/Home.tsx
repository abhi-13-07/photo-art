import "../App.css";
import { withDragAndDrop, Box, Header } from "../Components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faImage } from "@fortawesome/free-solid-svg-icons";
import { useImage } from "../Context/ImageProvider";
import { ImageActionType } from "../Types";
import { useTheme } from "../Context/ThemeProvider";
import { combineWithTheme } from "../utils";

const Home = () => {
	const { dispatch } = useImage();
	const navigate = useNavigate();
	const { theme } = useTheme();

	const handleFileChange = (files: FileList) => {
		if (!files || files.length <= 0) return;
		const file = files[0];
		const imageUrl = URL.createObjectURL(file);
		dispatch({ type: ImageActionType.SET, payload: imageUrl });
		navigate("/");
	};

	const DragAndDrop = withDragAndDrop(Box, handleFileChange);

	return (
		<section id="Home">
			<div className="container">
				<Header />
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
