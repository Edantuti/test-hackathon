import React from 'react';
import { ReactComponent as Play } from '../assets/play.svg';
import { ReactComponent as Pause } from '../assets/pause.svg';
import { ReactComponent as Next } from '../assets/next.svg';
import { ReactComponent as Prev } from '../assets/prev.svg';
import { ReactComponent as RepeatAll } from '../assets/repeat_all.svg';
import { ReactComponent as RepeatOne } from '../assets/repeat_one.svg';
import { ReactComponent as Shuffle } from '../assets/shuffle.svg';
import { ReactComponent as Download } from '../assets/download.svg';

function AudioControls({
	isPlaying,
	onPlayPauseClick,
	onPrevClick,
	onNextClick,
	isRepeat,
	repeatIcon,
}) {
	
	// function showIcon() {
	// 	console.log(repeatIcon)
	// }
	// 	switch(isRepeat) {
	// 		case "repeat_all":
	// 			return (<RepeatAll />)
	// 		case "repeat_one":
	// 			return (<RepeatOne />)
	// 		case "shuffle":
	// 			return (<Shuffle />)
	// 	}
	function repeatIcon() {
		switch(isRepeat) {
			case "repeat_all":
				return <RepeatAll />;
			case "repeat_one":
				return <RepeatOne />;
			case "shuffle":
				return <Shuffle />;
		}
	}


	return (
		<>
		<div className="audio-controls">
		<button
				type="button"
				className="prev"
				aria-label="Previous"
				onClick={onPrevClick}
		>
		<Prev />
		</button>

		{isPlaying ? (
			<button
				type="button"
				className="pause"
				onClick={() => onPlayPauseClick(false)}
				aria-label="Pause"
			>
			<Pause />
			</button>
		) : (
			<button
				type="button"
				className="play"
				onClick={() => onPlayPauseClick(true)}
				aria-label="Play"
			>
			<Play />
			</button>
		)}
		<button
			type="button"
			className="next"
			onClick={onNextClick}
			aria-label="Next"
		>
		<Next />
		</button>
		<button><Download /></button>
		</div>
		</>
	)
}

export default AudioControls;
