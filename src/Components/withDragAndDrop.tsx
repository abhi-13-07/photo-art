import React, { ComponentType, useRef } from "react";

interface OnChangeFunc {
	(files: FileList): void;
}

function withDragAndDrop<T>(Component: ComponentType<T>, onChange: OnChangeFunc) {
	return (props: T) => {
		const inputRef = useRef<HTMLInputElement>(null);

		const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			e.stopPropagation();
		};

		const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			e.stopPropagation();

			const { files } = e.dataTransfer;

			if (!files || files.length <= 0) return;

			onChange(files);
		};

		const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
			const input = inputRef.current;
			if (!input) return;
			input.click();
		};

		const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const { files } = e.target;

			if (!files || files.length <= 0) return;

			onChange(files);
		};

		return (
			<div
				className="drag-n-drop-zone"
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				onClick={handleClick}
			>
				<Component {...(props as T)} />
				<input type="file" hidden ref={inputRef} onChange={handleFileChange} />
			</div>
		);
	};
}

export default withDragAndDrop;
