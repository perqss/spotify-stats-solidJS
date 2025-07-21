import { useNavigate } from "@solidjs/router";
import { useContext } from "solid-js";
import { PlaybackAPIContext } from "./PlaybackProvider";

const AlbumCard = ({ album }) => {
    const context = useContext(PlaybackAPIContext);
    const navigate = useNavigate();

    const handleClickAlbum = () => {
        navigate(`/album/${album[1].id}`);
    };
    
    const handleClickPlayBtn = (event) => {
        event.stopPropagation();
        context.playAlbum(album[1].id);
    };

    return (
        <div class="artist-album-card" onClick={handleClickAlbum}>
          <img class="artist-album-image" src={album[1].image} alt={album[0]} />
          <div class="artist-album-info">
              <p class="artist-album-name">{`${album[0]}`}</p>
          </div>
          <div>
            <button 
              class="material-icons" 
              style={{
                'background-color': 'inherit'
              }} 
              onClick={handleClickPlayBtn} 
              title="Play"
            >
              play_circle
            </button>
          </div>
        </div>
    );
};

export default AlbumCard;