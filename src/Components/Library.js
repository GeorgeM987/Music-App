import React from "react";
import LibrarySong from './LibrarySong';




const Library = ({songs, setSongs, setCurrentSongs, audioRef, isPlaying, libraryStatus}) => {

    return(
        <div className={`library ${libraryStatus ? 'active-library' : ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map((song) => {return(<LibrarySong setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} song={song} songs={songs} setCurrentSongs={setCurrentSongs} id={song.id} key={song.id}/>)})}   
            </div>
        </div>
    );
}




export default Library