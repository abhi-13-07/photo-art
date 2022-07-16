export const createCanvas = (height: number, width: number): HTMLCanvasElement => {
	const canvas = document.createElement("canvas");
	canvas.height = height;
	canvas.width = width;
	return canvas;
};

export const drawImage = (
	stream: HTMLImageElement | HTMLVideoElement,
	canvas: HTMLCanvasElement,
	options?: any
): string => {
	const ctx = canvas.getContext("2d")!;
	ctx.translate(canvas.width, 0);
	ctx.scale(-1, 1);
	ctx.drawImage(stream, 0, 0, canvas.width, canvas.height);
	return canvas.toDataURL("image/jpeg");
};

export const getDefaultTheme = (): string => {
	const defaultTheme = window.matchMedia("(prefers-color-scheme: dark)");

	if (defaultTheme.matches) return "dark";
	return "light";
};

export const combineWithTheme = (theme: string, className: string): string => {
	return `${className}-${theme}`;
};
