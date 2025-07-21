import { getSavedTracks, areTracksSaved, removeSavedTracks } from "../clients/SpotifyClient";
import Song from "../components/Song";
import { assignSongId } from "../common";
import { createSignal, onMount } from "solid-js";

const SavedSongs = () => {
    const [songs, setSongs] = createSignal([]);

    const fetchSavedTracks = async () => {
        const response = await getSavedTracks();
        return response.items;
    };

    onMount(() => {
        const fetchSongsWrapper = async () => {
            const savedTracks = await fetchSavedTracks();
            const songIds = savedTracks.map((song) => song.track.id);
            const saved = await areTracksSaved(songIds);
            const newSongs = savedTracks.map((song, index) => {
                return {
                    ...song.track,
                    isSaved: saved[index],
                };
            });
            setSongs(newSongs);
        };

        fetchSongsWrapper();
    })

    const handleClickSaveBtnParent = async (song) => {
        await removeSavedTracks([song.id]);
        setSongs(prevSongs => prevSongs.filter(s => s.id !== song.id));
    };

    return (
        <div>
          <div className='display-outer-container'>
            <div className='display-inner-container'>
              <div className='song-container'>
                <For each={songs()}>
                    {(song, index) => 
                        <>
                            <div>{index() + 1}</div>
                            <Song
                                className={assignSongId(songs(), index())}
                                songInfo={song}
                                handleClickSaveBtnParent={handleClickSaveBtnParent}
                            />
                        </>
                    }
                </For>
              </div>
            </div>
          </div>
        </div>
    )
};

export default SavedSongs;