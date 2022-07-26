import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCamera,
	faCameraRotate,
	faArrowLeft,
	faArrowRotateLeft,
	faArrowRight,
	faBan
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { createCanvas, detectMobileDevice, drawImage } from "../utils";
import { useImage } from "../Context/ImageProvider";
import { ImageActionType } from "../Types";
import { Modal } from "../Components";
import { nanoid } from "nanoid";
import { useTitle } from "../Hooks/useTitle";

const NewPicture = () => {
	const [facing, setFacing] = useState("user");
	const [hasPermission, setHasPermission] = useState(true);
	const videoRef = useRef<HTMLVideoElement>(null);
	const navigate = useNavigate();
	const { state, dispatch } = useImage();
	const { image } = state;

	const isUserFacing = facing === "user";
	const isMobileDevice = detectMobileDevice();

	useTitle("Take New Picture");

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
			} catch (err: any) {
				const { message } = err;
				if (message === "Permission denied") {
					setHasPermission(false);
				}
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
		setFacing(prev => (prev === "user" ? "environment" : "user"));
	};

	const takePhoto = () => {
		const { current: video } = videoRef;

		if (!video) return;

		const height = video.videoHeight;
		const width = video.videoWidth;

		const canvas = createCanvas(height, width);
		const imageUrl = drawImage(video, canvas, { translate: isUserFacing });

		dispatch({ type: ImageActionType.SET, payload: { image: imageUrl, name: `${nanoid(6)}.jpg` } });
	};

	const navigateBack = () => {
		navigate("/");
	};

	const retake = () => {
		dispatch({ type: ImageActionType.CLEAR, payload: { image: "", name: "" } });
	};

	const next = () => {
		navigate("/edit");
	};

	return (
		<section id="NewPicture">
			{!hasPermission && (
				<Modal>
					<FontAwesomeIcon icon={faBan} size="3x" color="#e05879" />
					<h3>Access Denied</h3>
					<span>Your browser has denied to use your camera</span>
					<p>
						<a href="https://support.google.com/chrome/answer/2693767?hl=en&co=GENIE.Platform%3DDesktop#zippy=">
							Click here
						</a>{" "}
						to know more about how to enable access to your camera.
					</p>
				</Modal>
			)}
			<div className="video-container">
				{!image ? (
					<video className={`video ${isUserFacing && "transform"}`} ref={videoRef} autoPlay></video>
				) : (
					<img className="preview" src={image} alt="user" />
				)}
			</div>
			<div className="controls-container">
				<div className="controls">
					{!image ? (
						<>
							<button className="btn btn-transparent" onClick={navigateBack}>
								<FontAwesomeIcon icon={faArrowLeft} size="2x" />
							</button>
							<button className="btn btn-light btn-lg btn-round" onClick={takePhoto}>
								<FontAwesomeIcon icon={faCamera} size="3x" />
							</button>
							<button
								disabled={!isMobileDevice}
								className="btn btn-transparent"
								onClick={flipCamera}
							>
								<FontAwesomeIcon icon={faCameraRotate} size="2x" />
							</button>
						</>
					) : (
						<>
							<button className="btn btn-transparent" onClick={retake}>
								<FontAwesomeIcon icon={faArrowRotateLeft} size="2x" />
							</button>
							<button className="btn btn-light btn-lg btn-round" onClick={next}>
								<FontAwesomeIcon icon={faArrowRight} size="2x" />
							</button>
						</>
					)}
				</div>
			</div>
		</section>
	);
};

export default NewPicture;
