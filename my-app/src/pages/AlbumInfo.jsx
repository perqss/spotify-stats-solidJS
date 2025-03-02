import { createResource } from "solid-js";
import { SpotifyPlayButton } from "../components/MaterialComponentsCss";
import { useNavigate, useParams } from "@solidjs/router";  
import { ArrowBackIosNewOutlined } from "@suid/icons-material";
import Song from "../components/Song";
import { getAlbum } from "../clients/SpotifyClient";
import { Avatar, Typography, IconButton, List } from "@suid/material";
import { getReleaseDateYear, grey, lighterMainColor, parseArtists } from "../common";

const AlbumInfo = () => {
    const navigate = useNavigate();
    const { albumId } = useParams();

    const fetchAlbum = async () => {
        const response = await getAlbum(albumId);
        return response;
    };

    const [albumInfo] = createResource(fetchAlbum);

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
          {albumInfo() && <div
           style={{
              display: 'flex',
              ['flex-direction']: 'column',
              ['margin-left']: '200px',
              height: '100%',
              ['background-color']: lighterMainColor,
          }}
          >
            <div
              style={{display: 'flex'}}
            >
              <Avatar
                sx={{
                  width: '25vw',
                  height: '55vh',
                  marginTop: '80px',
                  borderRadius: 0,
                  marginLeft: '120px',
                }}
                src={albumInfo().images[1].url}
              />
              <div
                style={{
                  ['margin-left']: '20px',
                }}
              >
                <Typography
                  variant='h4'
                  color='white'
                  sx={{
                    marginTop: '80px'
                  }}
                >
                  {albumInfo().name}
                </Typography>
                <Typography
                  variant='h5'
                  color={grey}
                >
                  {parseArtists(albumInfo().artists)}
                </Typography>
                <Typography
                  variant='h6'
                  color={grey}
                >
                  {albumInfo().label}
                </Typography>
                <Typography
                  variant='h6'
                  color={grey}
                >
                  {getReleaseDateYear(albumInfo().release_date)}
                </Typography>
                {albumInfo().genres.map((genre, index) =>
                  <Typography
                    key={index}
                    variant='h6'
                    color={grey}
                  >
                    {genre}
                  </Typography>
                )}
                <SpotifyPlayButton
                        href={albumInfo().external_urls.spotify}
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
            <Typography
                variant='h5'
                color='white'
                sx={{margin: 3}}
              >
                Album tracks
            </Typography>
            <List>
              {albumInfo().tracks.items.map((song, index) => 
                <Song
                  key={index}
                  songInfo={song}
                  index={index + 1}
                  length={albumInfo().tracks.items.length}
                  albumInfo={albumInfo()}
                />
              )}
            </List>
          </div>}
        </div>
      );
};

export default AlbumInfo;
