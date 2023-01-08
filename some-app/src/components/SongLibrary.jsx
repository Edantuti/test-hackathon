import React from "react";
import trackInfo from "./tracks";
import SongItem from "./SongItem";
import "../styles/SongItem.css";

function SongLibrary({ tracks }) {
	return (
		<>
		Library
		{trackInfo.map((trackInfo) => (
			<div className="song-library-item">
			<SongItem tracks={trackInfo} /> 
			</div>
			))
		}
		</>
	)
}

export default SongLibrary;
