import { createSignal, createResource } from "solid-js";
import { lighterMainColor } from "../common";
import { parseArtists } from "../common";
import { grey, getReleaseDateYear } from "../common";
import { getTrackAudioFeatures, getTrack, getTrackAudioAnalysis } from "../clients/SpotifyClient";
import { useNavigate, useParams } from "@solidjs/router";

const SongInfo = () => {
const { songId } = useParams();
const navigate = useNavigate();
const [audioFeatures, setAudioFeatures] = createSignal();
const [audioAnalysis, setAduioAnalysis] = createSignal();

const fetchSong = async () => {
    const response = await getTrack(songId);
    return response;
};

const [songInfo] = createResource(fetchSong);

return (
    <div style={{overflowX: 'hidden'}}>
        <IconButton
            sx={{
                top: '70px',
                left: '250px',
            }}
            onClick={() => navigate(-1)}
        >
            <ArrowBackIosNewOutlined
                sx={{
                    color: 'white'
                }}
            />
        </IconButton>
        {
        songInfo() &&
        <div
            style={{
                display: 'flex',
                ['flex-direction']: 'column',
                ['margin-left']: '200px',
                height: '100vh',
                ['background-color']: lighterMainColor,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    ['flex-direction']: 'row',
                }}
            >
                <Avatar
                    sx={{
                        width: '25vw',
                        height: '55vh',
                        ['margin-top']: '80px',
                        ['margin-left']: '120px',
                        ['border-radius']: 0,
                    }}
                    src={songInfo().album.images[0].url}
                />
                <div
                    style={{
                        ['margin-left']: '1vw'
                    }}
                >
                    <Typography
                        variant='h4'
                        color='white'
                        sx={{
                            marginTop: '80px',
                        }}
                    >
                        {songInfo().name}
                    </Typography>
                    <Typography
                        variant='h5'
                        color={grey}
                    >
                        {songInfo().album.name}
                    </Typography>
                    <Typography
                        variant='h6'
                        color={grey}
                    >
                        {parseArtists(songInfo().artists)}
                    </Typography>
                    <Typography
                        variant='h6'
                        color={grey}
                    >
                        {getReleaseDateYear(songInfo().album.release_date)}
                    </Typography>
                    <SpotifyPlayButton
                        href={songInfo().external_urls.spotify}
                        variant='contained'
                        target='_BLANK'
                        sx={{
                            marginTop: '10px'
                        }}
                    >
                        <Typography
                            variant='h6'
                        >
                            Play on Spotify
                        </Typography>
                    </SpotifyPlayButton>
                </div>
            </div>
        </div>
        }
    </div>
)
};

export default SongInfo;