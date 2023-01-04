import React, { useState, useEffect, useRef } from 'react';
import AudioControls from "./AudioControls";
import '../styles/AudioPlayer.css';

const AudioPlayer = ({ tracks }) => {
	// State
	const [trackIndex, setTrackIndex] = useState(0);
	const [trackProgress, setTrackProgress] = useState(0);
	const [isPlaying, setIsPlaying] = useState(0);

	const [comment, setComment] = useState('');

	const { title, artist, color, image, audioSrc } = tracks[trackIndex];

	// Refs
  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef();

	const { duration } = audioRef.current;

	const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : "0%";
	const trackStyling = `
		-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
	`;
	
	const startTimer = () => {
		clearInterval(intervalRef.current);

		intervalRef.current = setInterval(() => {
			if (audioRef.current.ended) {
				toNextTrack();
			} else {
				setTrackProgress(audioRef.current.currentTime);
			}
		}, [1000]);
	}

	function onScrub(value) {
		clearInterval(intervalRef.current);
		audioRef.current.currentTime = value;
		setTrackProgress(audioRef.current.currentTime);
	}

	function onScrubEnd() {
		if (!isPlaying) {
			setIsPlaying(true);
		}
		startTimer();
	};

	function toPrevTrack() {
		if (trackIndex - 1 < 0) {
			setTrackIndex(tracks.length - 1);
		} else {
			setTrackIndex(trackIndex - 1);
		}
  };

  function toNextTrack() {
		if (trackIndex < tracks.length - 1) {
			setTrackIndex(trackIndex + 1);
		} else {
			setTrackIndex(0);
		}
  };

	// Check play-pause, depends on isPlaying
	useEffect(() => {
		if (isPlaying) {
			audioRef.current.play();
			startTimer();
		} else {
			audioRef.current.pause();
		}
	}, [isPlaying]);

	useEffect(() => {
		audioRef.current.pause();
		
		audioRef.current = new Audio(audioSrc);
		setTrackProgress(audioRef.current.currentTime);

		if (isReady.current) {
			audioRef.current.play();
			setIsPlaying(true);
			startTimer();
		} else {
			isReady.current = true;
		}
	}, [trackIndex]);

	// pause and clean up on unmount
	useEffect(() => {
		return () => {
			audioRef.current.pause();
			clearInterval(intervalRef.current);
		}
	}, []);

	const getTime = (time) => {
		return `${Math.floor(time / 60)} : ${("0" + Math.floor(time % 60)).slice(-2)}`
	}

	const getDuration = () => {
		if (duration) {
			return `${Math.floor(`${duration}` / 60)} : ${("0" + Math.floor(`${duration}` % 60)).slice(-2)}`
		} else {
			return "0:00"
		}
	}

	// Show time on hovering over seek bar
	const onSliderHover = (e) => {
		let hoverTime = (
			((e.clientX - e.target.offsetLeft) / e.target.clientWidth - 0.2) * `${duration}`
		).toFixed(2);

		if (hoverTime < 0) {
			hoverTime = 0;
		}

		console.log("Hover time : "+getTime(hoverTime))
	}

	function handleCommentSubmit(e) {
		e.preventDefault();
		console.log("Timestamp (in seconds): "+trackProgress);
		console.log("Timestamp (human readable): "+getTime(trackProgress));
		console.log("Comment is : "+comment.value)
	}

	return (
		<>
		<div className="audio-player">
			<div className="track-info">
			  <img
			    className="artwork"
			    src={image}
			    alt={`track artwork for ${title} by ${artist}`}
			  />
		    <h2 className="title">{title}</h2>
        <h3 className="artist">{artist}</h3>
				<AudioControls
					isPlaying={isPlaying}
					onPrevClick={toPrevTrack}
					onNextClick={toNextTrack}
					onPlayPauseClick={setIsPlaying}
				/>
				{getTime(trackProgress)} / {getDuration()}
				<input
					type="range"
					value={trackProgress}
					step="1"
					min="0"
					max={duration ? duration : `${duration}`}
					className="progress"
					onChange={(e) => onScrub(e.target.value)}
					onMouseUp={onScrubEnd}
					onKeyUp={onScrubEnd}
					style={{ background: trackStyling }}
				/>
				
			</div>
			<div className="add-comment">
				<i className="fa fa-comment"></i>
				<form onSubmit={handleCommentSubmit}>
				<input 
					type="text"
					onChange={(e) => setComment({value: e.target.value})}
					placeholder="Enter your comment here"
				/>
				</form>
			</div>
		</div>
		</>
	)
}

export default AudioPlayer;
