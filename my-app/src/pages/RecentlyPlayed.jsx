import { onMount, For } from "solid-js";
import { getRecentlyPlayed, areTracksSaved, saveTracks, removeSavedTracks } from '../clients/SpotifyClient';
import Song from "../components/Song";
import { assignSongId } from "../common";
import { createStore } from "solid-js/store";

const RecentlyPlayed = () => {
    const [songs, setSongs] = createStore([]);

    const fetchRecentlyPlayed = async () => {
        const response = await getRecentlyPlayed();
        return response.items;
    }

    onMount(() => {
        const fetchSongsWrapper = async () => {
        const recentlyPlayedSongs = await fetchRecentlyPlayed();
        const trackIds = recentlyPlayedSongs.map(({ _, track }) => track.id);
        const saved = await areTracksSaved(trackIds);
        const newSongs = recentlyPlayedSongs.map((item, index) => {
            return {
                ...item,
                track: {
                    ...item.track,
                    isSaved: saved[index],
                }
            };
        });
        setSongs(newSongs);
        };

        fetchSongsWrapper();
  })

  const handleClickSaveBtnParent = async (song) => {
    if (!song.isSaved) {
      await saveTracks([song.id]);
    } else {
      await removeSavedTracks([song.id]);
    }
    setSongs(s => s.track.id === song.id, "track", "isSaved", !song.isSaved);
  };

    return (
        <div class='display-outer-container'>
            <div class='display-inner-container'>
                <div class='song-container'>
                <For each={songs}>
                    {(song, index) => 
                        <>
                            <div>{index() + 1}.</div>
                            <Song
                                className={assignSongId(songs, index())}
                                songInfo={song.track}
                                handleClickSaveBtnParent={handleClickSaveBtnParent}
                            />
                        </>
                    }
                </For>
                </div>
            </div>
        </div>
    );
};

export default RecentlyPlayed;
