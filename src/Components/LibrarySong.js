import React from "react";




const LibrarySong = ({id, song, songs, setSongs, setCurrentSongs, audioRef, isPlaying}) => {
    //handler function:
    const songSelectHandler = async () => {
        await setCurrentSongs(song);
        //add active state:
        const newSongs = songs.map((s) => {
            if(s.id === id){
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

    return(
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ""}`}>
            <img alt={song.name} src={song.cover}></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
}





export default LibrarySong;





