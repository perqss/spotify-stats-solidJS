import { spotifyGreen } from "../common";
import styles from './SpotifyPlayButton.module.css';

const SpotifyPlayButton = ({ text, ...restProps}) => {
    return (
        <a
            className={styles["spotify-button"]}
            style={{
                'background-color': spotifyGreen
            }}
            {...restProps}
        >
            {text}
        </a>
    )
};

export default SpotifyPlayButton;