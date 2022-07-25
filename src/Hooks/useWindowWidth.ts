import { useState, useEffect } from "react";

export const useWindowWidth = () => {
	const [width, setWidth] = useState<number>(window.innerWidth);

	useEffect(() => {
		const handleResize = (e: Event) => {
			const window = e.target as Window;
			setWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return width;
};
