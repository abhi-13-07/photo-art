import { useEffect } from "react";

export const useTitle = (title: string): void => {
	useEffect(() => {
		document.title = title;

		return () => {
			document.title = "Photo Art";
		};
	}, [title]);
};
