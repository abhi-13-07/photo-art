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
	ctx.drawImage(stream, 0, 0, canvas.height, canvas.width);
	return canvas.toDataURL("image/jpeg");
};
