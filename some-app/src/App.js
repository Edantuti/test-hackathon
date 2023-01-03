import './App.css';
import React, { useState } from 'react';
import AudioPlayer from './AudioPlayer';
import tracks from './tracks';
// import axios from 'axios';

function App() {
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
		console.log(event.target.value)
	}

	function handleUrlSubmit(event) {
		event.preventDefault();
		const url = 'http://0.0.0.0:8000/api/text/';	
		const formData = new FormData();
		formData.append('text', yturl.value)
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

		<div className="header">
		ASAP Logo
		<i class="fa fa-bars"></i>
		</div>

    <div className="App">

		<button onClick={handleVideoClick} className={isShown ? "button-select" : "button-unselect"}>
			Upload a Video
		</button>
		<button onClick={handleUrlClick} className={isShown ? "button-unselect" : "button-select"}>
			Paste YouTube link
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
					<input type="text" className = "yturl" onChange={handleUrlChange} placeholder="Paste YouTube URL to convert it to audio file"/>
					<p>
					<button type="submit" className="convert">Convert</button>
					</p>
				</form>
				</>
			)}

    </div>
		<p>
		<h1>Recent</h1>
		<AudioPlayer tracks={tracks} />
		</p>
		<p>
		<h1>Recent</h1>
		<AudioPlayer tracks={tracks} />
		</p>
		</>
  );
}

export default App;
