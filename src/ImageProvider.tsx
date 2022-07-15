import React, { useReducer, createContext, useContext } from "react";
import { ImageState, ImageAction, ImageActionType, ImageContextType } from "./Types/index";

const initialState: ImageState = {
	image: ""
};

const ImageContext = createContext<ImageContextType>({} as ImageContextType);

export const useImage = (): ImageContextType => useContext(ImageContext);

export const ImageProvider = ({ children }: React.PropsWithChildren) => {
	const reducer = (state: ImageState, { type, payload }: ImageAction): ImageState => {
		switch (type) {
			case ImageActionType.SET:
				return { ...state, image: payload };
			case ImageActionType.CLEAR:
				return { ...state, image: "" };
		}
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<ImageContext.Provider
			value={{
				state,
				dispatch
			}}
		>
			{children}
		</ImageContext.Provider>
	);
};
