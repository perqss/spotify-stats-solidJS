import { createResource } from "solid-js";
import { getReleaseDateYear, parseArtists } from "../common";
import { getTrack } from "../clients/SpotifyClient";
import { useNavigate, useParams } from "@solidjs/router";
import SpotifyPlayButton from "../components/SpotifyPlayButton";
import styles from '../components/SongInfo.module.css';

const SongInfo = () => {
const { songId } = useParams();
const navigate = useNavigate();

const fetchSong = async () => {
    const response = await getTrack(songId);
    return response;
};

const [songInfo] = createResource(fetchSong);

return (
    <>
      <button
        class="material-icons back-button"
        onClick={() => navigate(-1)}
      >
        arrow_back_ios
      </button>
      {
        songInfo() && 
        <div class={styles["song-display"]}>
          <div class={styles["song-content-row"]}>
              <img 
                  class="cover-display"
                  src={songInfo().album.images[0].url}
                  alt="Album cover"
              />
              <div class={styles["song-details"]}>
                  <div class={styles["song-name"]}>
                      {songInfo().name}
                  </div>
                  <div class={styles["album-name"]}>
                      {songInfo().album.name}
                  </div>
                  <div class={styles["artist-names"]}>
                      {parseArtists(songInfo().artists)}
                  </div>
                  <div class={styles["release-year"]}>
                      {getReleaseDateYear(songInfo().album.release_date)}
                  </div>
                  <SpotifyPlayButton 
                      text="Play on Spotify"
                      href={songInfo().external_urls.spotify}
                      target="_BLANK"
                  />
              </div>
          </div>
      </div>
      }
    </>
);
};

export default SongInfo;