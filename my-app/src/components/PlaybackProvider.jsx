import { createContext } from "solid-js";
import { createStore } from "solid-js/store";

export const PlaybackAPIContext = createContext({});
export const PlaybackStateContext = createContext({});

const PlaybackProvider = (props) => {

    const [state, setState] = createStore({
        songId: null, artistId: null, albumId: null, open: false
    });

    const api = {
        playArtist: id => setState({ songId: null, albumId: null, artistId: id, open: true }),
        playSong:   id => setState({ artistId: null, albumId: null, songId: id, open: true }),
        playAlbum:  id => setState({ songId: null, artistId: null, albumId: id, open: true })
    };

    return (
        <PlaybackAPIContext.Provider value={api}>
            <PlaybackStateContext.Provider value={{state, setState}}>
                {props.children}
            </PlaybackStateContext.Provider>
        </PlaybackAPIContext.Provider>
    );
};

export default PlaybackProvider;