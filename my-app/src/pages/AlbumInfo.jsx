import { Index, onMount, Show, For } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";  
import Song from "../components/Song";
import { getReleaseDateYear, parseArtists } from '../common';
import { createStore } from "solid-js/store";
import { getAlbum, areTracksSaved, saveTracks, removeSavedTracks } from '../clients/SpotifyClient';
import SpotifyPlayButton from "../components/SpotifyPlayButton";
import styles from '../components/AlbumInfo.module.css';

const AlbumInfo = () => {
    const navigate = useNavigate();
    const { albumId } = useParams();
    const [albumInfo, setAlbumInfo] = createStore({album: null});

    const fetchAlbum = async () => {
        const response = await getAlbum(albumId);
        return response;
    };

    onMount(() => {
      const fetchAlbumWrapper = async () => {
        const album = await fetchAlbum();
        const songIds = album.tracks.items.map(track => track.id);
        const saved = await areTracksSaved(songIds);
        const newAlbumInfo = {
          ...album,
          tracks: {
            ...album.tracks,
            items: album.tracks.items.map((track, index) => ({
              ...track,
              isSaved: saved[index],
            })),
          }
        };
        setAlbumInfo("album", newAlbumInfo);
    };
      
      fetchAlbumWrapper();
    })

    const handleClickSaveBtnParent = async (song) => {
      if (!song.isSaved) {
        await saveTracks([song.id]);
      } else {
        await removeSavedTracks([song.id]);
      }
      setAlbumInfo("album", "tracks", "items", s => s.id === song.id, "isSaved", !song.isSaved);
    };

    return (
        <>
          <button 
              class="back-button material-icons" 
              onClick={() => navigate(-1)}
          >
              arrow_back_ios
      </button>
        <Show when={albumInfo.album}>
          <div class={styles["album-display"]}>
            <div class={styles["album-header"]}>
                <img 
                    class="cover-display"
                    src={albumInfo.album.images[1].url}
                    alt="Album Cover"
                />

                <div class="song-album-info">
                    <div class={styles["album-title"]}>
                        {albumInfo.album.name}
                    </div>
                    <div class={styles["album-artist"]}>
                        {parseArtists(albumInfo.album.artists)}
                    </div>
                    <div class={styles["album-label"]}>
                        {albumInfo.album.label}
                    </div>
                    <Index each={albumInfo.album.genres}>
                        {(genre) => 
                            <div class={styles["album-genre"]}>
                                {genre()}
                            </div>
                        }
                    </Index>
                    <div class={styles["album-year"]}>
                        {getReleaseDateYear(albumInfo.album.release_date)}
                    </div>
                    <SpotifyPlayButton
                        text="Play on Spotify"
                        href={albumInfo.album.external_urls.spotify}
                        target="_blank"
                    />
                </div>
            </div>
            <div class={styles["tracks-header"]}>
                Album tracks
            </div>
            <div class={styles["tracks-list"]}>
              <For each={albumInfo.album.tracks.items}>
                {(song, index) => 
                  <>
                    <div>{index() + 1}.</div>
                    <Song
                      albumCover={albumInfo.album.images[1].url}
                      songInfo={song}
                      handleClickSaveBtnParent={handleClickSaveBtnParent}
                    />
                  </>
                }
              </For>
            </div>
          </div>
        </Show>
      </>
      );
};

export default AlbumInfo;
