export interface ImageState {
	image: string;
	name: string;
}

export enum ImageActionType {
	SET = "SET_IMAGE",
	CLEAR = "CLEAR_IMAGE"
}

export interface ImageAction {
	type: ImageActionType;
	payload: ImageState;
}

export interface ImageContextType {
	state: ImageState;
	dispatch: React.Dispatch<ImageAction>;
}

export interface ThemeContextType {
	theme: string;
	setTheme: React.Dispatch<React.SetStateAction<string>>;
}
