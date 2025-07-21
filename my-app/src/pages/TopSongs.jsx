import { createEffect, For } from 'solid-js';
import { createStore } from 'solid-js/store';
import { getTopSongs, areTracksSaved, saveTracks, removeSavedTracks } from '../clients/SpotifyClient';
import Song from '../components/Song';
import { assignSongId } from '../common';

const TopSongs = ({ songTerm }) => {
  const [songs, setSongs] = createStore([]);

  const fetchTopSongs = async () => {
    const response = await getTopSongs(songTerm());
    return response.items;
  };

  createEffect(() => {
    const fetchSongsWrapper = async () => {
      const topSongs = await fetchTopSongs();
      const songIds = topSongs.map((song) => song.id);
      const saved = await areTracksSaved(songIds);
      const newSongs = topSongs.map((song, index) => {
        return {
          ...song,
          isSaved: saved[index],
        };
      });
      setSongs(newSongs);
    };

    fetchSongsWrapper();
  })

  const handleClickSaveBtnParent = async (song) => {
    if (song.isSaved) {
      await removeSavedTracks([song.id]);
    } else {
      await saveTracks([song.id]);
    }
    setSongs(s => s.id === song.id, 'isSaved', !song.isSaved);
  };

  return (
    <div class='display-outer-container'>
      <div class='display-inner-container'>
        <div class='song-container'>
          <For each={songs}>
            {(song, index) => (
              <>
                <div>{index() + 1}.</div>
                <Song
                  className={assignSongId(songs, index())}
                  songInfo={song}
                  handleClickSaveBtnParent={handleClickSaveBtnParent}
                />
              </>
            )}
          </For>
        </div>
      </div>
    </div>
  )
};

export default TopSongs;