import logo from './logo.svg';
import './App.css';
import AudioPlayer from "./AudioPlayer";
import tracks from "./tracks";

function App() {
  return (
		<>
    <div className="App">
		<AudioPlayer tracks={tracks} />
    </div>
		</>
  );
}

export default App;
