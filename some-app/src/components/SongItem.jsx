import React from "react";
import image from "../assets/img1.png";

import '../styles/SongItem.css';

function SongItem ({ tracks }) {

	function songSelectHandler() {
		console.log('TODO Do something when a song is selected')
	}

	return (
		<>
		<div className="song-item" onClick={songSelectHandler}>
			<img align="left" src={tracks.image} alt={`track artwork for ${tracks.title} by ${tracks.artist}`}/>
			<br/>
			<div className="song-item-title">{tracks.title}</div>
			<div className="song-item-artist">{tracks.artist}</div>
			<a href="#">Play Button</a>
		</div>
		</>
	)
}




export default SongItem;
