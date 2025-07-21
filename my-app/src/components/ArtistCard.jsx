import { useContext } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { spotifyGreen } from '../common';
import { PlaybackAPIContext } from './PlaybackProvider';

const ArtistCard = ({ className, artistInfo, handleClickFollowBtnParent }) => {
  const context = useContext(PlaybackAPIContext);
  const navigate = useNavigate();

  const handleClickPlayBtn = (e) => {
    e.stopPropagation();
    context.playArtist(artistInfo.id);
  };

  const handleClickArtist = () => {
    navigate(`/artist/${artistInfo.id}`);
  };

  const handleClickFollowBtn = async (event) => {
    event.stopPropagation();
    await handleClickFollowBtnParent(artistInfo);
  };

  return (
    <div class={`${className} artist-card`}>
        <div class="artist-album-card" onClick={handleClickArtist}>
            <img class="artist-album-image" src={artistInfo.images[0].url} alt={artistInfo.name} />
            <div class="artist-album-info">
                <p class="artist-album-name">{`${artistInfo.name}`}</p>
            </div>
            <div>
              <button 
                  class="material-icons play-button" 
                  onClick={handleClickPlayBtn}
                  title="Play"
                >
                    play_circle
                </button>
                <button 
                  class={`material-icons follow-button ${artistInfo.isFollowing ? 'followed' : 'not-followed'}`} 
                  style={{'background-color': 'inherit', color: artistInfo.isFollowing ? spotifyGreen : 'white'}}
                  onClick={handleClickFollowBtn}
                  title="Follow"
                >
                  favorite
                </button>
            </div>
        </div>
    </div>
  );
}

export default ArtistCard;