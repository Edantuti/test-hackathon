import React from 'react';

const ImgCard = ({ pic: {url} }) => {
	return (
		<img alt="an anime girl pic" src={url !== "N/A" ? url : "https://via.placeholder.com/400"}/>
	)
}

export default ImgCard;
