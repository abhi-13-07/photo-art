import { useState } from "react";
import "./App.css";
import { withDragAndDrop, Box } from "./Components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faImage } from "@fortawesome/free-solid-svg-icons";

const App = () => {
	const [file, setFile] = useState<File | null>(null);

	const handleFileChange = (files: FileList) => {
		if (!files || files.length <= 0) return setFile(null);
		const file = files[0];
		setFile(file);
	};

	const DragAndDrop = withDragAndDrop(Box, handleFileChange);

	return (
		<div className="container">
			<h1 className="text-white">Photo Art</h1>
			<form className="form">
				<DragAndDrop>
					<span>Drag And Drop Files Here or Click</span>
					<FontAwesomeIcon icon={faImage} size="2x" />
				</DragAndDrop>
				<Box onClick={e => console.log("Box Clicked")}>
					<span>Take New Picture</span>
					<FontAwesomeIcon icon={faCamera} size="2x" />
				</Box>
			</form>
			{file && <img src={URL.createObjectURL(file)} alt={file.name} />}
		</div>
	);
};

export default App;
