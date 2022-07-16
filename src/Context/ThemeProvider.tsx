import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeContextType } from "../Types";
import { getDefaultTheme } from "../utils";

const ThemeContext = createContext<ThemeContextType>({
	theme: "dark",
	setTheme: () => {}
});

export const useTheme = (): ThemeContextType => useContext(ThemeContext);

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
	const [theme, setTheme] = useState<string>(getDefaultTheme());

	useEffect(() => {
		const themeMediaQuery: MediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

		const handleMediaThemeChange = (e: MediaQueryListEvent) => {
			if (e.matches) {
				setTheme("dark");
			} else {
				setTheme("light");
			}
		};

		themeMediaQuery.addEventListener("change", handleMediaThemeChange);

		return () => {
			themeMediaQuery.removeEventListener("change", handleMediaThemeChange);
		};
	}, []);

	return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
