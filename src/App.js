import React from "react";
import { useState } from "react";
import { useRef } from "react";
//styles:
import './Styles/app.scss';
//components:
import Player from "./Components/Player";
import Song from "./Components/Song";
import Library from "./Components/Library";
import Nav from './Components/Nav';
//import data:
import data from './Data';




function App() {
  //ref:
  const audioRef = useRef('null');
  //state:
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSongs] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({currentTime: 0, duration: 0});
  const [libraryStatus, setLibraryStatus] = useState(false);
  //event handler:
  const timeUpdateHandler = (e) => {
      const current = e.target.currentTime;
      const duration = e.target.duration;
      setSongInfo({...songInfo, currentTime: current, duration: duration});
  }
  
  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((s) => {
        if(s.id === nextPrev.id){
            return{...s, active: true}
        }
        else{
            return{...s, active: false}
        }
    });
    setSongs(newSongs);
    //check if the song is playing:
    if(isPlaying){
        return audioRef.current.play();
    }
}

  const songEndHandler = () => {
    let currentIndex = songs.findIndex((song) => {return song.id === currentSong.id});
    setCurrentSongs(songs[(currentIndex + 1) % songs.length]);
    if(isPlaying){
      setTimeout(() => {
        activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        return audioRef.current.play();
      }, 100);
    }
  }

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong}/>
      <Player activeLibraryHandler={activeLibraryHandler} setSongs={setSongs} setCurrentSongs={setCurrentSongs} songs={songs} songInfo={songInfo} setSongInfo={setSongInfo} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong}/>
      <Library libraryStatus={libraryStatus} setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} songs={songs} setCurrentSongs={setCurrentSongs}/>
      <audio onEnded={songEndHandler} onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
