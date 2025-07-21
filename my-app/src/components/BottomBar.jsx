import { useContext } from "solid-js";
import { PlaybackStateContext } from "./PlaybackProvider";

const BottomBar = () => {
    const context = useContext(PlaybackStateContext);
    const contextState = context.state;

    const chooseSrc = () => {
        if (contextState.songId) {
            return `https://open.spotify.com/embed/track/${contextState.songId}?utm_source=generator`;
        } else if (contextState.artistId) {
            return `https://open.spotify.com/embed/artist/${contextState.artistId}?utm_source=generator`;
        } else if (contextState.albumId) {
            return `https://open.spotify.com/embed/album/${contextState.albumId}?utm_source=generator`;
        }
        return '';
    };

    return (
        <div>
            {contextState.open && <div style={{'margin-top': '70px'}}>
                <iframe
                    style={{
                        position: 'fixed',
                        width: '100%',
                        'border-radius': '12px',
                        bottom: '-70px',
                    }}
                    src={chooseSrc()}
                    frameBorder="0" 
                    allowFullScreen="" 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                    title="Spotify Player"
                ></iframe>
                <button 
                    style={{
                        bottom: '70px',
                        left: '0px',
                        padding: '10px',
                        position: 'fixed',
                        border: 'none',
                        'background-color': 'inherit',
                    }}
                    onClick={() => context.setState("open", false)}
                    class="material-icons"
                >
                    cancel
                </button>
            </div>}
        </div>
    )
};

export default BottomBar;