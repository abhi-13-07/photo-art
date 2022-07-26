import React, { useState, useEffect } from "react";

const getValue = <T>(key: string, defaultValue: T | (() => T)): T => {
	const item = localStorage.getItem(key);
	if (item) return JSON.parse(item);

	if (defaultValue instanceof Function) return defaultValue();
	return defaultValue;
};

const setValue = <T>(key: string, value: T): void => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const useLocalStorage = <T>(
	key: string,
	defaultValue: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>] => {
	const [item, setItem] = useState<T>(() => getValue<T>(key, defaultValue));

	useEffect(() => {
		setValue(key, item);
	}, [item, key]);

	return [item, setItem];
};
