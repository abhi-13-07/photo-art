import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCamera,
	faCameraRotate,
	faArrowLeft,
	faArrowRotateLeft,
	faPaperPlane
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { createCanvas, drawImage } from "../utils";
import { useImage } from "../ImageProvider";
import { ImageActionType } from "../Types";

const NewPicture = () => {
	const [facing, setFacing] = useState("user");
	const videoRef = useRef<HTMLVideoElement>(null);
	const navigate = useNavigate();
	const { state, dispatch } = useImage();
	const { image } = state;

	useEffect(() => {
		let stream: MediaStream;
		const video = videoRef.current;

		const getMedia = async () => {
			if (!navigator.mediaDevices) return;
			if (image !== "") return;

			try {
				stream = await navigator.mediaDevices.getUserMedia({
					video: {
						facingMode: facing,
						width: {
							ideal: 1280
						},
						height: {
							ideal: 720
						}
					}
				});

				if (!video) return;

				video.srcObject = stream;
				video.addEventListener("loadedmetadata", () => {
					video.play();
				});
			} catch (err) {
				console.log(err);
			}
		};

		getMedia();

		return () => {
			const videoTracks: MediaStreamTrack[] = stream?.getVideoTracks();

			if (!videoTracks) return;

			videoTracks[0].stop();

			if (video) {
				video.srcObject = null;
			}
		};
	}, [facing, image]);

	const flipCamera = () => {
		setFacing("environment");
	};

	const takePhoto = () => {
		const { current: video } = videoRef;

		if (!video) return;

		const height = video.videoHeight;
		const width = video.videoWidth;

		const canvas = createCanvas(height, width);
		const imageUrl = drawImage(video, canvas);

		dispatch({ type: ImageActionType.SET, payload: imageUrl });
	};

	const navigateBack = () => {
		navigate("/");
	};

	const retake = () => {
		dispatch({ type: ImageActionType.CLEAR, payload: "" });
	};

	const next = () => {
		navigate("/edit");
	};

	return (
		<section id="NewPicture">
			<div className="video-container">
				{!image ? (
					<video className="video" ref={videoRef} autoPlay></video>
				) : (
					<img className="preview" src={image} alt="user" />
				)}
			</div>
			<div className="controls-container">
				<div className="controls">
					{!image ? (
						<>
							<button className="btn-borderless" onClick={navigateBack}>
								<FontAwesomeIcon icon={faArrowLeft} size="2x" />
							</button>
							<button className="btn btn-round" onClick={takePhoto}>
								<FontAwesomeIcon icon={faCamera} size="3x" />
							</button>
							<button className="btn-borderless" onClick={flipCamera}>
								<FontAwesomeIcon icon={faCameraRotate} size="2x" />
							</button>
						</>
					) : (
						<>
							<button className="btn-borderless" onClick={retake}>
								<FontAwesomeIcon icon={faArrowRotateLeft} size="2x" />
							</button>
							<button className="btn btn-round" onClick={next}>
								<FontAwesomeIcon icon={faPaperPlane} size="2x" />
							</button>
						</>
					)}
				</div>
			</div>
		</section>
	);
};

export default NewPicture;
