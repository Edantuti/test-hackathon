import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {

	const [isShown, setIsShown] = useState(true);
	const [file, setFile] = useState();

	function handleUploadChange(event) {
		setFile(event.target.files[0]);
		console.log(event.target.files)
	}

	function handleUploadSubmit(event) {
		event.preventDefault()
		const url = 'http://0.0.0.0:8000/api/';
		const formData = new FormData();
		formData.append('video', file);
		const config = {
			headers: {
				'content-type': 'multipart/form-data',
			},
		};

		axios.post(url, formData, config).then((response) => {
			console.log(response.data);
		})
	}

	function handleVideoClick(event) {
		setIsShown(true);
	}

	function handleURLClick(event) {
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
			
    <div className="App">
		<button onClick={handleVideoClick}>Upload a Video</button>
		<button onClick={handleURLClick}>Paste YouTube link</button>
			{isShown ? (
				<>
				<div className="center">
				{fileData()}
				<form onSubmit={handleUploadSubmit}>
					<input type="file" className="video-upload" onChange={handleUploadChange}/>
					<button type="submit">Upload</button>
				</form>
				</div>
				</>
			) : (
				<>
				<h1>Paste the URL</h1>
				<form>
					<input type="text" className = "yt-url" placeholder="Paste YouTube URL to convert it to audio file"/>
				</form>
				</>
			)}

    </div>
		</>
  );
}

export default App;
