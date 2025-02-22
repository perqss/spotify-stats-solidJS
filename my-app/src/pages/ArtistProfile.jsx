import { createSignal, createEffect, createResource } from 'solid-js';
import { useParams } from '@solidjs/router';
import { Avatar } from '@suid/material';
import { lighterMainColor } from '../common';
import { getArtist } from '../clients/SpotifyClient';
import { Typography, Paper, IconButton } from '@suid/material';
import { mainColor } from '../common';
import { SpotifyPlayButton } from '../components/MaterialComponentsCss';
import { useNavigate } from '@solidjs/router';
import { ArrowBackIosNewOutlined } from '@suid/icons-material';

const ArtistProfile = () => {
    const { artistId } = useParams();
    //const [artistInfo, setArtistInfo] = createSignal();
    const navigate = useNavigate();

    const fetchArtist = async (artistId) => {
        const response = await getArtist(artistId);
        return response;
    }

    const [artistInfo] = createResource(artistId, fetchArtist);

    return (
        <div style={{['overflow-x']: 'hidden'}}>
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
            {artistInfo() && 
            <div
                style={{
                    display: 'flex',
                    ['flex-direction']: 'column',
                    ['justify-content']: 'center',
                    ['align-items']: 'center',
                    ['margin-left']: '200px',
                    height: '100vh',
                    ['background-color']: lighterMainColor,
                }}
            >
                <Avatar
                    sx={{
                        width: '25vw',
                        height: '55vh',
                        marginTop: '60px',
                    }}
                    src={artistInfo().images[0].url}
                />
    
                <Paper
                    sx={{
                        backgroundColor: mainColor,
                        padding: '10px',
                        margin: '10px'
                    }}
                >
                    <Typography
                        gutterBottom
                        variant='h6'
                        color='white'
                    >
                        {artistInfo().followers.total} followers
                    </Typography>
                </Paper>
                <div
                    style={{
                        display: 'flex',
                        ['flex-direction']: 'row',
                    }}
                >
                    {artistInfo().genres.map((genre, index) =>
                        <Paper
                            key={index}
                            sx={{
                                margin: '10px',
                                backgroundColor: mainColor,
                                padding: '10px'
                            }}
                        >
                            <Typography
                                gutterBottom
                                variant='h6'
                                color='white'
                            >
                                {genre}
                            </Typography>
                        </Paper>
                    )}
                </div>
                <SpotifyPlayButton
                    href={artistInfo().external_urls.spotify}
                    variant='contained'
                    sx={{
                        margin: '10px',
                    }}
                    target='_BLANK'
                >
                    <Typography
                        variant='h6'
                    >
                        Play on Spotify
                    </Typography>
                </SpotifyPlayButton>
            </div>}
        </div>
      )
}

export default ArtistProfile;