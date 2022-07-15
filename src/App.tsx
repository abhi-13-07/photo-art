import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Pages";
import Edit from "./Pages/Edit";
import NewPicture from "./Pages/NewPicture";
import { ImageProvider } from "./ImageProvider";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<ImageProvider>
					<Route path="/" element={<Home />} />
					<Route path="/new-picture" element={<NewPicture />} />
					<Route path="/edit" element={<Edit />} />
				</ImageProvider>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
