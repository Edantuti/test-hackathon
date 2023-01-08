import React, { useState } from 'react';

import './styles/App.css';
import AudioPlayer from './components/AudioPlayer';
import Convert from './components/Convert';
import tracks from './components/tracks';
import SongLibrary from './components/SongLibrary';

function App() {

	const [isConvert, setIsConvert] = useState(true);
	const [isSignIn, setIsSignIn] = useState(false);

	return (
		<>

		<div className="header">
		<strong>ASAP</strong>
		<nav>
			<ul role="menubar" aria-haspopup="true">
				<li><a href="#">Sign in</a></li>
				<li><a onClick={(e) => setIsConvert(!isConvert)}>{isConvert ? "Listen" : "Convert"}</a>
		</li>
			</ul>
		</nav>
		</div>

		{isConvert ? (
			<>
			<Convert />
			</>
		) : (
			<>
			<AudioPlayer tracks={tracks} />
			</>
		)}
		<br/>
		</>
  );
}

export default App;
