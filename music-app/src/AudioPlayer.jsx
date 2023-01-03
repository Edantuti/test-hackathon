import React, { useState, useEffect, useRef } from 'react';
import AudioControls from "./AudioControls";
import './AudioPlayer.css';

function AudioPlayer ({ tracks }) {
	// State
	const [trackIndex, setTrackIndex] = useState(0);
	const [trackProgress, setTrackProgress] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);

	const { title, artist, color, image, audioSrc } = tracks[trackIndex];

	// Refs
  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);

	const { duration } = audioRef.current;

	const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : '0%';
	const trackStyling = `
		-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
	`;

	function toPrevTrack() {
		if (trackIndex - 1 < 0) {
			setTrackIndex(tracks.length - 1);
		} else {
			setTrackIndex(trackIndex - 1);
		}
  }

  function toNextTrack() {
		if (trackIndex < tracks.length - 1) {
			setTrackIndex(trackIndex + 1);
		} else {
			setTrackIndex(0);
		}
  }

	// Check audio progress, depends on miliseconds
	function startTimer() {
		clearInterval(intervalRef.current);

		intervalRef.current = setInterval(() => {
			if (audioRef.current.ended) {
				toNextTrack();
			} else {
				setTrackProgress(audioRef.current.currentTime);
			}
		}, [1000]);
	}

	// Check play-pause, depends on isPlaying
	useEffect(() => {
		if (isPlaying) {
			audioRef.current.play();
		} else {
			audioRef.current.pause();
		}
	}, [isPlaying]);

	// pause and clean up on unmount
	useEffect(() => {
		return () => {
			audioRef.current.pause();
			clearInterval(intervalRef.current);
		}
	}, []);

	// Check if ready to play, depends on trackIndex
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
				<input
					type="range"
					name="progress"
					onMouseEnter={(e) => console.log('Progress: '+trackProgress)}
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
		</div>
		</>
	)
}

export default AudioPlayer;
