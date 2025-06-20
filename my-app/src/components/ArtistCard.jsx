import { useContext } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { AppContext } from '../App';
import { spotifyGreen } from '../common';

const ArtistCard = ({ className, artistInfo, handleClickFollowBtnParent }) => {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  const handleClickPlayBtn = (e) => {
    e.stopPropagation();
    context.setArtistId(artistInfo.id);
    context.setOpenBottomBar(true);
    context.setSongId(null);
    context.setAlbumId(null);
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
                  style={{'background-color': 'inherit'}} 
                  class="material-icons" 
                  onClick={handleClickPlayBtn}
                  title="Play"
                >
                    play_circle
                </button>
                <button 
                  class="material-icons follow-button" 
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