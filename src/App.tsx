import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Pages";
import Edit from "./Pages/Edit";
import NewPicture from "./Pages/NewPicture";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/new-picture" element={<NewPicture />} />
				<Route path="/edit" element={<Edit />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
