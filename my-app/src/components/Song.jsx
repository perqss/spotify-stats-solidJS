import { useContext } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { grey, parseArtists, durationInHrMinSec } from '../common';
import styles from './Song.module.css';
import { PlaybackAPIContext } from './PlaybackProvider';
import Waveform from './Waveform';

const Song = ({ className, songInfo, albumCover, handleClickSaveBtnParent }) => {
    const context = useContext(PlaybackAPIContext);
    const navigate = useNavigate();

    const handleSecondary = () => {
        if (albumCover) {
            return `${parseArtists(songInfo.artists)}`;
        } else {
            return `${parseArtists(songInfo.album.artists)} - ${songInfo.album.name}`;
        }
    }

    const handleClickPlayBtn = (e) => {
      e.stopPropagation();
      context.playSong(songInfo.id);
    };

    const handleClickSaveBtn = async (event) => {
        event.stopPropagation();
        await handleClickSaveBtnParent(songInfo);
    };

    const handleSongClick = () => {
        navigate(`/song/${songInfo.id}`);
    };
  
  return (
    <div class={`${className} song-card`}>
        <div class={styles["song-item"]} onClick={handleSongClick}>
            <div class={styles["song-left"]}>
                <img
                    class={styles["song-graphic"]}
                    src={albumCover ? albumCover : songInfo.album.images[2].url}
                    alt="Cover art"
                />
                <div class={styles["song-text"]}>
                    <div class={styles["primary-text"]}>{songInfo.name}</div>
                    <div 
                        class={styles["secondary-text"]} 
                        style={{
                            color: {grey}
                        }}
                    >
                        {handleSecondary()}
                    </div>
                </div>
            </div>
            <div class={styles["meta-controls"]}>
                <button 
                    class={`material-icons save-button ${songInfo.isSaved ? 'saved' : 'not-saved'}`} 
                    style={{'background-color': 'inherit', color: songInfo.isSaved ? 'yellow' : 'white'}}
                    onClick={handleClickSaveBtn}
                    title={songInfo.isSaved ? "Remove from Library" : "Add to Library"}
                > 
                    bookmark_add
                </button>
                <button 
                    class="material-icons play-button"
                    onClick={handleClickPlayBtn}
                    title="Play"
                >
                    play_circle
                </button>
                <div class={styles["duration"]}>{durationInHrMinSec(songInfo.duration_ms)}</div>
            </div>
        </div>
        <Waveform songId={songInfo.id}/>
    </div>
)};

export default Song;