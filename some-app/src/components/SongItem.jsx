import React from "react";

function SongItem () {
	const songSelectHandler = async () => {
		await setCurrent
	}
	return (
		<>
		TODO: Song Item
		<SongContainer onClick={songSelectHandler}>
			<img src={image} alt={`track artwork for ${title} by ${artist}`}/>
			<SongDescription>
				<h1>{title}</h1>
				<h2>{artist}</h2>
			</SongDescription>
		</SongContainer>
		</>
	)
}

export default SongItem;
