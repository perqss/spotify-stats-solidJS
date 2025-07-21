import { createResource, Index } from 'solid-js';
import { useParams } from '@solidjs/router';
import { getArtist } from '../clients/SpotifyClient';
import { useNavigate } from '@solidjs/router';
import SpotifyPlayButton from '../components/SpotifyPlayButton';
import styles from '../components/ArtistProfile.module.css';

const ArtistProfile = () => {
    const { artistId } = useParams();
    const navigate = useNavigate();

    const fetchArtist = async () => {
        const response = await getArtist(artistId);
        return response;
    }

    const [artistInfo] = createResource(fetchArtist);

    return (
        <>
            <button
                class="material-icons back-button"
                onClick={() => navigate(-1)} 
            >
                arrow_back_ios
            </button>
            {
                artistInfo() && 
                <div
                    class={`${styles["artist-profile-display"]} artist-profile-display`}
                >
                    <img
                        src={artistInfo().images[0].url}
                        alt="Artist Cover"
                        class={styles["artist-image"]}
                    />
                    <div class={styles["info-card"]}>
                        <div class={styles["info-text"]}>
                            {artistInfo().followers.total} followers
                        </div>
                    </div>
                    <div class={styles["genres-container"]}>
                        <Index each={artistInfo().genres}>
                            {(genre) => 
                                <div class={styles["info-card"]}>
                                    <div class={styles["info-text"]}>
                                        {genre()}
                                    </div>
                                </div>
                            }
                        </Index>
                    </div>
                    <SpotifyPlayButton 
                        href={artistInfo().external_urls.spotify} 
                        target="_blank"
                        text="Play on Spotify"
                    />
                </div>
            }
        </>
      )
}

export default ArtistProfile;