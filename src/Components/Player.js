import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";




const Player = ({audioRef, currentSong, isPlaying, setIsPlaying, songs, songInfo, setSongInfo, setCurrentSongs, setSongs, activeLibraryHandler}) => {
    //event handlers:
    const playSongHandler = () => {
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }
        else{
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value});
    }

    const getTime = (time) => {
        return(
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    }

    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => {return song.id === currentSong.id});
        if(direction === 'skip-forward'){
            await setCurrentSongs(songs[(currentIndex + 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        }
        if(direction === 'skip-back'){
            if((currentIndex - 1) % songs.length === - 1){
                await setCurrentSongs(songs[songs.length - 1]);
                activeLibraryHandler(songs[songs.length - 1]);
                if(isPlaying){
                    return audioRef.current.play();
                }
            }
            await setCurrentSongs(songs[(currentIndex - 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
        }
        if(isPlaying){
            return audioRef.current.play();
        }
    }

    return(
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input min={0} max={songInfo.duration || 0} value={songInfo.currentTime} onChange={dragHandler} type="range"/>
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0.00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => {return skipTrackHandler('skip-back')}} className='skip-back' size='2x' icon={faAngleLeft}/>
                <FontAwesomeIcon onClick={playSongHandler} className='play' size='2x' icon={isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon onClick={() => {return skipTrackHandler('skip-forward')}} className='skip-forward' size='2x' icon={faAngleRight}/>
            </div>
        </div>
    );
}





export default Player;





