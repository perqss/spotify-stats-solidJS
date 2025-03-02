import { createEffect, createResource, createSignal } from "solid-js";
import { getTopSongs } from "../clients/SpotifyClient";
import AlbumCard from '../components/AlbumCard';
import { Grid } from "@suid/material";
import styles from '../App.module.css'

const TopAlbums = (props) => {
    const [albums, setAlbums] = createSignal();

    const fetchTopSongs = async (term) => {
        const response = await getTopSongs(term);
        return response.items;
    };

    const [songsInfo] = createResource(props.albumTerm, fetchTopSongs);

    createEffect(() => {
        if (songsInfo()) {
            let result = {}
            songsInfo().forEach((song, index) => {
                if (song.album.album_type === 'album') {
                    if (!(song.album.name in result)) {
                        result[song.album.name] = {
                            indexSum: index,
                            count: 1,
                            image: song.album.images[0].url,
                            id: song.album.id,
                        }
                    } else {
                        result[song.album.name].count += 1;
                        result[song.album.name].indexSum += index;
                    }
                }     
            })
            const entries = Object.entries(result);
            entries.sort((a, b) => {
                // Sort by count in decreasing order
                if (b[1].count !== a[1].count) {
                return b[1].count - a[1].count;
                }
                // If count is equal, sort by indexSum in decreasing order
                return a[1].indexSum - b[1].indexSum;
            });
            setAlbums(entries);
        }
    })

    return (
        <div>
          <div 
            className={styles.displayOuterContainer}
          >
            <div 
              className={styles.displayInnerContainer}
            >
              <Grid container spacing={1}>
                {albums() && albums().map((album, index) => 
                  <Grid item key={index} xs={12} sm={6} md={2}>
                    <AlbumCard
                        album={album}
                        index={index + 1}
                    />
                  </Grid>
                )}
              </Grid>
            </div>
          </div>
        </div>
      );
};

export default TopAlbums;