import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCameraRotate, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const NewPicture = () => {
	const [facing, setFacing] = useState("user");
	const videoRef = useRef<HTMLVideoElement>(null);
	const navigate = useNavigate();

	useEffect(() => {
		let stream: MediaStream;
		const video = videoRef.current;

		const getMedia = async () => {
			console.log(window.screen.availWidth);
			console.log(window.screen.availHeight);
			if (!navigator.mediaDevices) return;

			try {
				stream = await navigator.mediaDevices.getUserMedia({
					video: {
						facingMode: facing,
						width: window.screen.availWidth,
						height: window.screen.availHeight
					}
				});

				if (!video) return;

				video.srcObject = stream;
				video.play();
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
				console.log(video);
				video.srcObject = null;
			}
		};
	}, [facing]);

	const flipCamera = () => {
		setFacing("environment");
	};

	const takePhoto = () => {
		//
	};

	const navigateBack = () => {
		navigate("/");
	};

	return (
		<section id="NewPicture">
			<div className="video-container">
				<video className="video" ref={videoRef} autoPlay></video>
			</div>
			<div className="controls-container">
				<div className="controls">
					<button className="btn-borderless" onClick={navigateBack}>
						<FontAwesomeIcon icon={faArrowLeft} size="2x" />
					</button>
					<button className="btn btn-round" onClick={takePhoto}>
						<FontAwesomeIcon icon={faCamera} size="3x" />
					</button>
					<button className="btn-borderless" onClick={flipCamera}>
						<FontAwesomeIcon icon={faCameraRotate} size="2x" />
					</button>
				</div>
			</div>
		</section>
	);
};

export default NewPicture;
