import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Pages";
import Edit from "./Pages/Edit";
import NewPicture from "./Pages/NewPicture";
import { ImageProvider, ThemeProvider } from "./Context";

const App = () => {
	return (
		<BrowserRouter>
			<ImageProvider>
				<ThemeProvider>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/new-picture" element={<NewPicture />} />
						<Route path="/edit" element={<Edit />} />
					</Routes>
				</ThemeProvider>
			</ImageProvider>
		</BrowserRouter>
	);
};

export default App;
