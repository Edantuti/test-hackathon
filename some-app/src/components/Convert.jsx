import React, { useState } from "react";
import SongItem from "./SongItem";
import trackInfo from "./tracks";

function Convert () {

	const [isShown, setIsShown] = useState(true);
	const [file, setFile] = useState();
	const [yturl, setYturl] = useState('');

	function handleUploadChange(event) {
		setFile(event.target.files[0]);
		console.log(event.target.files)
	}

	function handleUploadSubmit(event) {
		event.preventDefault()
		const url = 'http://0.0.0.0:8000/api/';
		const formData = new FormData();
		formData.append('video', file);
		// const config = {
		// 	headers: {
		// 		'content-type': 'multipart/form-data',
		// 	},
		// };

		fetch(url, {   // Using the built in fetch to POST
			method: 'POST',
			mode: 'cors',
			body: formData,
		}).then()

		// Using axios to POST
		// axios.post(url, formData, config).then((response) => {
		// 	console.log(response.data);
		// })
	}

	function handleUrlChange(event) {
		setYturl({value: event.target.value});
		// console.log(event.target.value)
	}

	function handleUrlSubmit(event) {
		event.preventDefault();
		const url = 'http://0.0.0.0:8000/api/ytdlp/';	
		const formData = new FormData();
		formData.append('url', yturl.value)
		fetch (url, {
			method: 'POST',
			mode: 'cors',
			body: formData,
		})
	}

	function handleVideoClick(event) {
		setIsShown(true);
	}

	function handleUrlClick(event) {
		setIsShown(false);
	}

	function fileData() {
		if (file){
			return (
				<>
				<h2>File Details:</h2>
				<p>File Name: {file.name}</p>
				<p>File Type: {file.type}</p>
				</>
			)
		} else {
			return (
				<>
				<h1>Choose a video file</h1>
				</>
			)
		}
	}

	return (
		<>
		<div className="main">
		<br/>
		<button onClick={handleVideoClick} className={isShown ? "button-select" : "button-unselect"}>
			&nbsp;Upload Video File&nbsp;&nbsp;
		</button>
		<button onClick={handleUrlClick} className={isShown ? "button-unselect" : "button-select"}>
			&nbsp;&nbsp;&nbsp;&nbsp;Paste URL link&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		</button>
			{isShown ? (
				<>
				{fileData()}
				<form onSubmit={handleUploadSubmit}>
					<input type="file" className="video-upload" onChange={handleUploadChange}/>
				<p>
					<button type="submit" className="convert">Convert</button>
				</p>
					
				</form>
				</>
			) : (
				<>
				<h1>Paste the URL</h1>
				<form onSubmit = {handleUrlSubmit}>
					<input type="text" className = "yturl" onChange={handleUrlChange} placeholder="Paste URL to convert it to audio file"/>
					<p>
					<button type="submit" className="convert">Convert</button>
					</p>
				</form>
				</>
			)}
		<br/>
		</div>
		<h1 style={{textAlign: "center", fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"}}>Recent Audio here</h1>
		<div className="recent-audio">
		{trackInfo.map((trackInfo) => (
			<div className="item">
			<SongItem tracks={trackInfo} /> 
			</div>
			))
		}
		</div>
	</>
	)
}

export default Convert;
